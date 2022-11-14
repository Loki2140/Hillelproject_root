import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Badge, IconButton, MenuItem } from "@mui/material";
import {
  ShoppingBasket,
  SyncAltRounded,
  FavoriteBorderRounded,
  Logout
} from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/reducers/globalSlicer";

export default function LeftMobileMenu() {
  const { products: compProducts } = useAppSelector(
    (state) => state.comparisonReducer
  );
  const { products: cartProducts } = useAppSelector(
    (state) => state.productCartReducer
  );
  const { products: likedProducts } = useAppSelector(
    (state) => state.productLikedReducer
  );
  const dispatch = useAppDispatch();
  const handleLogout = (event: MouseEvent<HTMLElement>) => {
    dispatch(logout());
  };
  return (
    <>
      <MenuItem>
        <Link to="/productsComparison">
          <IconButton size="large" color="inherit">
            <Badge badgeContent={compProducts.length} color="error">
              <SyncAltRounded />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/productsLiked">
          <IconButton size="large" color="inherit">
            <Badge badgeContent={likedProducts.length} color="error">
              <FavoriteBorderRounded />
            </Badge>
          </IconButton>
          <p>Избранное</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/productsCart">
          <IconButton size="large" color="inherit">
            <Badge badgeContent={cartProducts.length} color="error">
              <ShoppingBasket />
            </Badge>
          </IconButton>
          <p>Корзина</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton size="large" color="inherit">
          <Logout />
        </IconButton>
        <p>Выйти</p>
      </MenuItem>
    </>
  );
}
