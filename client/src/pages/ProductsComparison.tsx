import { Container, Typography } from "@mui/material";
import React from "react";
import TableData from "../components/TableData/TableData";

export default function ProductsComparison() {
  return (
    <Container>
      <Typography variant="h4" component="div">
        Сравнение
      </Typography>
      <TableData />
    </Container>
  );
}
