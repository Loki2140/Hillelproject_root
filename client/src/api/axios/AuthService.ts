import axiosApi from "./axios.api";
import { AxiosError, AxiosResponse } from "axios";
import { IResponse } from "../../models/IResponse";

class AuthService {
  static async login(
    email: string | FormDataEntryValue | null,
    password: string | FormDataEntryValue | null
  ): Promise<AxiosResponse<IResponse>> {
    return axiosApi.post<IResponse>("/login", {
      email,
      password
    });
  }
  static async registration(
    email: string | FormDataEntryValue | null,
    password: string | FormDataEntryValue | null
  ): Promise<AxiosResponse<IResponse>> {
    return axiosApi.post<IResponse>("/registration", {
      email,
      password
    });
  }
  static async logout(): Promise<void> {
    return axiosApi.post("/logout");
  }
}

export default AuthService;
