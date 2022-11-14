import { alpha, Box, styled, Typography } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: alpha(theme.palette.primary.main, 0.65)
}));

export default function ActivateAcc() {
  return (
    <StyledBox>
      <Typography variant="h3" style={{ color: "white" }}>
        Пожалуйста проверьте свою почту и активируйте свой Аккаунт!
      </Typography>
    </StyledBox>
  );
}
