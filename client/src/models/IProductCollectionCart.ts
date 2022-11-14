import { IProduct } from "./IProduct";

export interface IProductCollectionCart {
  products: ICartProduct[];
  isLoading: boolean;
  error: string;
  menuPage?: string;
  tottalSum?: number;
}

export interface ICartProduct extends IProduct {
  inCart: number;
}
