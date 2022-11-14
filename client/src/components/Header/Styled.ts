import { alpha, AppBar, Divider, InputBase, styled } from "@mui/material";

export const SearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.3)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    width: "auto"
  }
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: "white",
  paddingLeft: "10px",
  marginRight: "10px"
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex"
  // width: "100vw"
}));
