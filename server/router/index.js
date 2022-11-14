import { Router } from "express";
import User_Controller from "../controllers/UserController.js";
import { body } from "express-validator";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  User_Controller.registration
);
router.post("/login", User_Controller.login);
router.post("/logout", User_Controller.logout);
router.get("/activate/:link", User_Controller.activate);
router.get("/refresh", User_Controller.refresh);
router.get("/users", authMiddleware, User_Controller.getUsers);

export default router;
