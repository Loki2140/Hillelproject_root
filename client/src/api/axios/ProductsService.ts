import { IProduct } from "./../../models/IProduct";
import axiosApi from "./axios.api";
import { AxiosResponse } from "axios";

class ProductsService {
  static async productList(): Promise<AxiosResponse<IProduct[]>> {
    return axiosApi.get<IProduct[]>("/productList");
  }
  static async productItem(
    id: string | number
  ): Promise<AxiosResponse<IProduct>> {
    return axiosApi.get<IProduct>(`products/${id}`);
  }
}

export default ProductsService;
