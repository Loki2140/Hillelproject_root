import React from "react";
import { Container, List, Typography } from "@mui/material";
import { useAppSelector } from "../hooks/redux";
import ProductLikedItem from "../components/ProductLikedItem/ProductLikedItem";

export default function ProductsLiked() {
  const { products, isLoading, error } = useAppSelector(
    (state) => state.productLikedReducer
  );

  return (
    <Container>
      <Typography variant="h4" component="div">
        Избранное
      </Typography>
      <List>
        {error && <div>Ошибка! В Избранном!!!</div>}
        {isLoading && <div>Loading...</div>}
        {products &&
          products.map((product) => (
            <ProductLikedItem key={`Liked${product.id}`} product={product} />
          ))}
      </List>
    </Container>
  );
}
