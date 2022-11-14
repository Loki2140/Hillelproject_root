import React, { useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { themeComfy } from "./themes/theme";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductsCart from "./pages/ProductsCart";
import ProductsLiked from "./pages/ProductsLiked";
import AboutProduct from "./pages/AboutProduct";
import ProductsComparison from "./pages/ProductsComparison";
import PageNotFound404 from "./pages/PageNotFound404";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useAppSelector, useAppDispatch } from "./hooks/redux";
import ActivateAcc from "./pages/ActivateAcc";
import { checkAuth } from "./store/reducers/globalSlicer";
import { CircularProgress, Grid } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const StartingPage = () => {
  return (
    <Routes>
      <Route path="/*">
        <Route path="signup" element={<Signup />}></Route>
        <Route index element={<Login />}></Route>
        <Route path="*" element={<PageNotFound404 />}></Route>
      </Route>
    </Routes>
  );
};

const PrivateRoutes = () => {
  const dispatch = useAppDispatch();
  const { isAuth, user, isLoading } = useAppSelector(
    (state) => state.globalSlicer
  );
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);
  if (isLoading)
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  if (!isAuth) return <StartingPage />;
  if (!user?.isActivated) return <ActivateAcc />;
  return <ShopRoutes />;
};

const ShopRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductList />} />
        <Route path="productsCart" element={<ProductsCart />} />
        <Route path="productsLiked" element={<ProductsLiked />} />
        <Route path="aboutProduct/:id" element={<AboutProduct />} />
        <Route path="productsComparison" element={<ProductsComparison />} />
        <Route path="notFound" element={<PageNotFound404 />}></Route>
        <Route path="*" element={<PageNotFound404 />}></Route>
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeComfy}>
        <BrowserRouter>
          <PrivateRoutes />
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
