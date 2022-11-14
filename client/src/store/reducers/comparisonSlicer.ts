import { IProduct } from "../../models/IProduct";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductCollection } from "../../models/IProductCollection";
import { toast } from "react-toastify";

const initialState: IProductCollection = {
  products: localStorage.getItem("sortItems")
    ? JSON.parse(localStorage.getItem("sortItems") || "[]")
    : [],
  isLoading: false,
  error: ""
};

export const comparisonSlicer = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    removeFromSort(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      toast.info("Вы убрали товар из списка сравнения!");
      localStorage.setItem("sortItems", JSON.stringify(state.products));
    },
    addToSort(state, action: PayloadAction<IProduct>) {
      const findProduct = state.products.some(
        (product) => product.id === action.payload.id
      );
      if (findProduct) {
        toast.info("Товар уже в списке сравнения!");
      } else {
        state.products.push(action.payload);
        toast.success("Товар добавлен в список сравнения!");
      }
      localStorage.setItem("sortItems", JSON.stringify(state.products));
    },
    clearSort(state, action: PayloadAction) {
      state.products = [];
      toast.error("Список сравнения пуст!");
      localStorage.setItem("sortItems", JSON.stringify(state.products));
    }
  }
});
export default comparisonSlicer.reducer;
