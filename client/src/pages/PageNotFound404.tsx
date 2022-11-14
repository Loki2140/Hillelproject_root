import { alpha, Box, styled, Typography } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: alpha(theme.palette.primary.main, 0.65)
}));

export default function PageNotFound404() {
  return (
    <StyledBox>
      <Typography variant="h1" style={{ color: "white" }}>
        404 Page not found!
      </Typography>
    </StyledBox>
  );
}
