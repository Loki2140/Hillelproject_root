import { UserS } from "../service/userService.js";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error.js";

import dotenv from "dotenv";

dotenv.config();

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequestError("Ошибка валидации!"));
      }
      const { email, password } = req.body;
      const userData = await UserS.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 864000000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserS.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 864000000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserS.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activateLink = req.params.link;
      await UserS.activate(activateLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserS.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 864000000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await UserS.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

const User_Controller = new UserController();
export default User_Controller;
