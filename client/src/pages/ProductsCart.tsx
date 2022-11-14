import React from "react";
import {
  IconButton,
  List,
  Typography,
  Container,
  Divider
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { productCartSlicer } from "../store/reducers/productCartSlicer";
import ProductCartItem from "../components/ProductCartItem/ProductCartItem";

export default function ProductsCart() {
  const { products, isLoading, error, tottalSum } = useAppSelector(
    (state) => state.productCartReducer
  );
  const { clearCart } = productCartSlicer.actions;
  const dispatch = useAppDispatch();

  const handelerOnClickDeleteAll = () => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <Typography variant="h4" component="div">
        Корзина
      </Typography>

      <List>
        {error && <div>Ошибка! В Корзине!!!</div>}
        {isLoading && <div>Loading...</div>}
        {products &&
          products.map((product) => (
            <ProductCartItem key={`Card${product.id}`} product={product} />
          ))}
      </List>
      <Divider variant="fullWidth" />
      <IconButton
        onClick={() => handelerOnClickDeleteAll()}
        edge="end"
        aria-label="delete"
      >
        <DeleteIcon />{" "}
        <Typography sx={{ paddingLeft: 1 }}>Очистить корзину! </Typography>
      </IconButton>
      <Typography
        align="right"
        sx={{ mt: 1, mb: 1 }}
        variant="h6"
        component="div"
      >
        Итого: {tottalSum} $
      </Typography>
    </Container>
  );
}
