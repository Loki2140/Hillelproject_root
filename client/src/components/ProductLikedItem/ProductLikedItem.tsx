import React from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from "@mui/material";
import {
  Delete as DeleteIcon,
  AddShoppingCart as AddShoppingCartIcon
} from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/redux";
import { productLikedSlicer } from "../../store/reducers/productLikedSlicer";
import { IProduct } from "../../models/IProduct";
import { productCartSlicer } from "../../store/reducers/productCartSlicer";

interface LikedItem {
  product: IProduct;
}

export default function ProductLikedItem({ product }: LikedItem) {
  const { removeFromLiked } = productLikedSlicer.actions;
  const { addToCart } = productCartSlicer.actions;
  const dispatch = useAppDispatch();

  const handelerOnClick = (id: number) => {
    dispatch(removeFromLiked(id));
  };

  const handelerOnAddCartClick = (newItemCart: IProduct) => {
    dispatch(addToCart(newItemCart));
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton
              onClick={() => handelerOnClick(product.id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              onClick={() => handelerOnAddCartClick(product)}
              color="primary"
              aria-label="add to shopping cart"
            >
              <AddShoppingCartIcon />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar alt="product img" src={product.image}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={product.title} />
      </ListItem>
      <Divider variant="inset" />
    </>
  );
}
