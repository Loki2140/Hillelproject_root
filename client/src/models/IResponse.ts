import { IUser } from "./IUser";

export interface IResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
