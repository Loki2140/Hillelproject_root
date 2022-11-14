import jwt from "jsonwebtoken";
import { TokenModel } from "../models/token-model.js";
import dotenv from "dotenv";

dotenv.config();

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY_ACCESS, {
      expiresIn: "15s"
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY_REFRESH, {
      expiresIn: "10d"
    });
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
  async findTokenInDB(token) {
    const tokenData = await TokenModel.findOne({ token });
    return tokenData;
  }
  validateRefreshToken(token) {
    console.log(token);
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY_REFRESH);
      return userData;
    } catch (error) {
      return null;
    }
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY_ACCESS);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

export const TokenS = new TokenService();
