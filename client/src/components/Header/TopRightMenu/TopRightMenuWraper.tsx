import { Badge, Box, IconButton, Menu } from "@mui/material";
import React, { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { StyledDivider } from "../Styled";
import {
  ShoppingBasket,
  SyncAltRounded,
  FavoriteBorderRounded,
  MoreVert,
  Logout
} from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import TopRightMobileMenu from "./TopRightMobileMenu";
import { logout } from "../../../store/reducers/globalSlicer";

export default function TopRightMenuWraper() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
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
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = "rightMenuMobile";
  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleLogout = (event: MouseEvent<HTMLElement>) => {
    dispatch(logout());
  };
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Link to="/productsComparison">
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={compProducts.length} color="error">
              <SyncAltRounded />
            </Badge>
          </IconButton>
        </Link>
        <StyledDivider orientation="vertical" variant="middle" flexItem />
        <Link to="/productsLiked">
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={likedProducts.length} color="error">
              <FavoriteBorderRounded />
            </Badge>
          </IconButton>
        </Link>
        <StyledDivider orientation="vertical" variant="middle" flexItem />
        <Link to="/productsCart">
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={cartProducts.length} color="error">
              <ShoppingBasket />
            </Badge>
          </IconButton>
        </Link>
        <StyledDivider orientation="vertical" variant="middle" flexItem />
        <IconButton onClick={handleLogout} sx={{ color: "white" }}>
          <Logout />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <TopRightMobileMenu />
        </Menu>
      </Box>
    </>
  );
}
