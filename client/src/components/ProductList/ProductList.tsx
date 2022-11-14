import React from "react";
import { CircularProgress, Container, Grid } from "@mui/material";
import { useFetchProductsCategoryQuery } from "../../api/rtq.api";
import { useAppSelector } from "../../hooks/redux";
import { IProduct } from "../../models/IProduct";
import ProductItem from "./ProductItem/ProductItem";

export default function ProductList() {
  const { menuPage = "electronics" } = useAppSelector(
    (state) => state.globalSlicer
  );
  const { searchState } = useAppSelector((state) => state.globalSlicer);
  const { isLoading, data, isError } = useFetchProductsCategoryQuery(menuPage);

  const filterList = () => {
    let newData = data?.filter((product: IProduct) => {
      if (searchState === "") return product;
      return (
        searchState &&
        product.title.toLowerCase().includes(searchState.toLowerCase())
      );
    });
    return newData;
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: "40px", marginBottom: "40px" }}>
      {isError && <div>Ошибка! В листе!</div>}
      {isLoading && (
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
      )}
      {!isLoading && (
        <Grid container spacing={5}>
          {filterList()?.map((product: IProduct) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
