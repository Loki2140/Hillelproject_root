import React, { ChangeEventHandler, useEffect, useState } from "react";
import { SearchIconWrapper, SearchInput, StyledInputBase } from "../Styled";
import { Search } from "@mui/icons-material";
import { useAppDispatch } from "../../../hooks/redux";
import { useDebounce } from "../../../hooks/debounce";
import { globalSlicer } from "../../../store/reducers/globalSlicer";

export default function SearchMenu() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const { changeSearchState } = globalSlicer.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeSearchState(debounced));
  }, [debounced, changeSearchState, dispatch]);

  const hendlerOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  return (
    <SearchInput sx={{ flexGrow: 1 }} onChange={hendlerOnChange}>
      <SearchIconWrapper sx={{ color: "white" }}>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        sx={{ width: "100%" }}
      />
    </SearchInput>
  );
}
