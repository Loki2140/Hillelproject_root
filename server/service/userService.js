import { UserModel } from "../models/user_model.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { MailS } from "./mailService.js";
import { TokenS } from "./tokenService.js";
import UserDto from "../dtos/user-dto.js";
import dotenv from "dotenv";
import { ApiError } from "../exceptions/api-error.js";

dotenv.config();

class UserService {
  async registration(email, password) {
    const candidat = await UserModel.findOne({ email });
    if (candidat) {
      throw ApiError.BadRequestError(
        `Пользователь с таким ${email} уже существует!`
      );
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const activationLink = uuidv4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink
    });
    await MailS.sendActivationEmail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = TokenS.generateToken({ ...userDto });
    await TokenS.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequestError("Некоректная ссылка активации!");
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequestError("Пользователь не зарегистрированн!");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequestError("Невернный пароль!");
    }
    const userDto = new UserDto(user);
    const tokens = TokenS.generateToken({ ...userDto });
    await TokenS.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await TokenS.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnautorizedError();
    }
    const userData = TokenS.validateRefreshToken(refreshToken);
    const tokenDB = await TokenS.findTokenInDB(refreshToken);
    if (!userData || !tokenDB) {
      throw ApiError.UnautorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenS.generateToken({ ...userDto });
    await TokenS.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

export const UserS = new UserService();
