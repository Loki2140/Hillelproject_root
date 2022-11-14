import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IProductCollection {
  products: IProduct[];
  isLoading: boolean;
  error: string | null | undefined;
  menuPage?: string;
  tottalSum?: number;
  searchState?: string;
  isAuth?: boolean;
  user?: IUser | null;
}
