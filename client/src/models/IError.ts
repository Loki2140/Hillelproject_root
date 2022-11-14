import { IBadResponse } from "./IBadResponse";

export interface IError {
  axiosErr: string;
  dbErr: IBadResponse;
}
