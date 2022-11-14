import React from "react";
import { styled, Typography } from "@mui/material";

const StyledFooter = styled("footer")(({ theme }) => ({
  color: "white",
  background: theme.palette.primary.main,
  marginTop: 20,
  position: "fixed",
  bottom: 0,
  width: "100%"
}));

export default function Footer() {
  return (
    <StyledFooter>
      <Typography paddingRight={2} align="right">
        © 2022 Copyright: Созданно в учебных целях
      </Typography>
    </StyledFooter>
  );
}
