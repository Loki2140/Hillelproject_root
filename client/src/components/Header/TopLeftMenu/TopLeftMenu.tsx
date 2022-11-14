import React, { MouseEvent } from "react";
import { MenuItem, Paper, MenuList, Box } from "@mui/material";
import { useAppDispatch } from "../../../hooks/redux";
import { globalSlicer } from "../../../store/reducers/globalSlicer";
import { Link } from "react-router-dom";

export default function TopRightMenu() {
  const { changeMenuPage } = globalSlicer.actions;
  const dispatch = useAppDispatch();

  const handelerOnClick = (e: MouseEvent<HTMLUListElement>) => {
    const { category = "electronics" } = (e.target as HTMLUListElement).dataset;
    dispatch(changeMenuPage(category));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Paper>
        <MenuList onClick={(e) => handelerOnClick(e)}>
          <MenuItem component={Link} to={"/"} data-category="electronics">
            Электроника
          </MenuItem>
          <MenuItem component={Link} to={"/"} data-category="jewelery">
            Укращения
          </MenuItem>
          <MenuItem component={Link} to={"/"} data-category="men's clothing">
            Для Него
          </MenuItem>
          <MenuItem component={Link} to={"/"} data-category="women's clothing">
            Для Нее
          </MenuItem>
        </MenuList>
      </Paper>
    </Box>
  );
}
