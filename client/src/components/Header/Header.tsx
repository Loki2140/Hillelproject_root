import React from "react";
import { Container, Toolbar, Typography } from "@mui/material";
import { StyledAppBar } from "./Styled";
import TopLeftMenuWrapper from "./TopLeftMenu/TopLeftMenuWrapper";
import TopRightMenuWraper from "./TopRightMenu/TopRightMenuWraper";
import SearhMenu from "./SearchMenu/SearchMenu";

export default function Header() {
  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%"
            }}
          >
            <TopLeftMenuWrapper />
          </Typography>
          <SearhMenu />
          <TopRightMenuWraper />
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
