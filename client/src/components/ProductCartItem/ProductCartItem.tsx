import React from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  ButtonGroup,
  Typography
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/redux";
import { productCartSlicer } from "../../store/reducers/productCartSlicer";
import { ICartProduct } from "../../models/IProductCollectionCart";
import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon
} from "@mui/icons-material";

interface CatrItem {
  product: ICartProduct;
}

export default function ProductCartItem({ product }: CatrItem) {
  const { removeFromCart, addToCart, removeAllFromCart } =
    productCartSlicer.actions;
  const dispatch = useAppDispatch();

  const handelerOnAddCartClick = (AddCartProduct: ICartProduct) => {
    dispatch(addToCart(AddCartProduct));
  };
  const handelerOnRemoveAllCartClick = (id: number) => {
    dispatch(removeAllFromCart(id));
  };
  const handelerOnRemoveCartClick = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <ListItem
        sx={{ height: "75px" }}
        secondaryAction={
          <>
            <IconButton
              onClick={() => handelerOnRemoveAllCartClick(product.id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar alt="product img" src={product.image}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={product.title} />
        <Typography
          sx={{ padding: "0 10px" }}
          variant="h5"
          noWrap
          color="text.secondary"
        >
          {product.inCart}
        </Typography>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          size="small"
        >
          <Button
            variant="outlined"
            onClick={() => {
              handelerOnAddCartClick(product);
            }}
          >
            <ArrowDropUpIcon />
          </Button>
          <Button
            variant="outlined"
            onClick={() => handelerOnRemoveCartClick(product.id)}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
      </ListItem>
      <Divider variant="inset" />
    </>
  );
}
