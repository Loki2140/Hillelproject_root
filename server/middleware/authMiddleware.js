import { ApiError } from "../exceptions/api-error.js";
import { TokenS } from "../service/tokenService.js";

export function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnautorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }
    const userData = TokenS.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnautorizedError());
  }
}
