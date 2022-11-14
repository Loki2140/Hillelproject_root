import React, { useState, MouseEvent } from "react";
import { Box, Button, IconButton, Menu } from "@mui/material";
import TopLeftMenu from "./TopLeftMenu";
import MenuIcon from "@mui/icons-material/Menu";

export default function TopRightMenuWrapper() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuHandlerOpen = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const menuHandlerClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          aria-controls={menuHandlerOpen ? "positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={menuHandlerOpen ? "true" : undefined}
          onClick={handleClick}
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="pos"
          anchorEl={anchorEl}
          open={menuHandlerOpen}
          onClose={menuHandlerClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <TopLeftMenu />
        </Menu>
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Button
          sx={{ color: "white" }}
          id="positioned-button"
          aria-controls={menuHandlerOpen ? "positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={menuHandlerOpen ? "true" : undefined}
          onClick={handleClick}
        >
          Каталог товаров
        </Button>
        <Menu
          id="pos"
          anchorEl={anchorEl}
          open={menuHandlerOpen}
          onClose={menuHandlerClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <TopLeftMenu />
        </Menu>
      </Box>
    </>
  );
}
