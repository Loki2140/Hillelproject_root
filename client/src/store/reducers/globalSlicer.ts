import { IBadResponse } from "./../../models/IBadResponse";
import { IError } from "../../models/IError";
import { IResponse } from "./../../models/IResponse";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductCollection } from "../../models/IProductCollection";
import AuthService from "../../api/axios/AuthService";
import axios, { AxiosError, AxiosResponse } from "axios";
import { BaseUrl } from "../../api/axios/axios.api";

const initialState: IProductCollection = {
  products: [],
  isLoading: false,
  error: null,
  menuPage: "electronics",
  searchState: "",
  isAuth: false,
  user: null
};

export const login = createAsyncThunk<
  IResponse,
  {
    email: string | FormDataEntryValue | null;
    password: string | FormDataEntryValue | null;
  },
  { rejectValue: IError }
>("global/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IResponse> = await AuthService.login(
      email,
      password
    );
    return response.data;
  } catch (error: any | unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue({
        axiosErr: error.message,
        dbErr: error!.response!.data!
      });
    }
    return rejectWithValue(error);
  }
});

export const registration = createAsyncThunk<
  IResponse,
  {
    email: string | FormDataEntryValue | null;
    password: string | FormDataEntryValue | null;
  },
  { rejectValue: IError }
>("global/registration", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IResponse> = await AuthService.registration(
      email,
      password
    );
    return response.data;
  } catch (error: any | unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue({
        axiosErr: error.message,
        dbErr: error!.response!.data!
      });
    }
    return rejectWithValue(error);
  }
});

// old one registration
// export const registration = createAsyncThunk<
//   AxiosResponse<IResponse>,
//   {
//     email: string | FormDataEntryValue | null;
//     password: string | FormDataEntryValue | null;
//   },
//   { rejectValue: AxiosError<IBadResponse> }
// >("global/registration", async ({ email, password }, { rejectWithValue }) => {
//   try {
//     const response: any = await AuthService.registration(email, password);
//     return response;
//   } catch (error: any | unknown) {
//     return rejectWithValue(error);
//   }
// });

export const logout = createAsyncThunk<void, void, { rejectValue: IError }>(
  "global/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
    } catch (error: any | unknown) {
      if (isAxiosError(error)) {
        return rejectWithValue({
          axiosErr: error.message,
          dbErr: error!.response!.data!
        });
      }
      return rejectWithValue(error);
    }
  }
);

export const checkAuth = createAsyncThunk<
  IResponse,
  void,
  { rejectValue: IError }
>("global/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IResponse>(`${BaseUrl}/refresh`, {
      withCredentials: true
    });
    return response.data;
  } catch (error: any | unknown) {
    if (isAxiosError(error)) {
      return rejectWithValue({
        axiosErr: error.message,
        dbErr: error!.response!.data!
      });
    }
    return rejectWithValue(error);
  }
});

export const globalSlicer = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeMenuPage(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.menuPage = action.payload;
      state.isLoading = false;
    },
    changeSearchState(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.searchState = action.payload;
      state.isLoading = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.accessToken);
        state.isAuth = true;
        state.isLoading = false;
        toast.success("Вы вошли! Поздравляем!");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.axiosErr;
        toast.error(action.payload?.dbErr.message);
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.accessToken);
        state.isAuth = true;
        state.isLoading = false;
        toast.success(
          "Вы удачно зарегистрировались! Проверьте почту для подтверждения!"
        );
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.axiosErr;
        toast.error(action.payload?.dbErr.message);
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("token");
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
      })
      .addCase(checkAuth.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.accessToken);
        state.user = action.payload.user;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {});
  }
});
export default globalSlicer.reducer;

export const isAxiosError = (input: any): input is AxiosError<IBadResponse> => {
  return input && input.isAxiosError;
};
