import comparisonReducer from "./reducers/comparisonSlicer";
import productCartReducer from "./reducers/productCartSlicer";
import globalSlicer from "./reducers/globalSlicer";
import productLikedReducer from "./reducers/productLikedSlicer";

import { rtqApi } from "../api/rtq.api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  comparisonReducer,
  productCartReducer,
  globalSlicer,
  productLikedReducer,
  [rtqApi.reducerPath]: rtqApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rtqApi.middleware)
  });
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
