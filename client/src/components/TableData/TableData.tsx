import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { comparisonSlicer } from "../../store/reducers/comparisonSlicer";
import { IconButton, Rating } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { toast } from "react-toastify";

export default function TableData() {
  const [selected, setSelected] = useState<GridRowId[]>([]);
  const { products } = useAppSelector((state) => state.comparisonReducer);
  const { removeFromSort } = comparisonSlicer.actions;
  const dispatch = useAppDispatch();

  const handleOnDeleteClick = (clickedUser: any) => {
    console.log(clickedUser);
    dispatch(removeFromSort(clickedUser.id));
  };

  const deleteSelectedFile = () => {
    if (selected.length === 0)
      return toast.error("Ничего не выделено из списка сравнения!");
    selected.forEach((row) => dispatch(removeFromSort(Number(row))));
    setSelected([]);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.1 },
    {
      field: "img",
      headerName: "Image",
      flex: 0.3,
      sortable: false
    },
    { field: "title", headerName: "Title", flex: 0.2 },
    { field: "category", headerName: "Category", flex: 0.2 },
    { field: "description", headerName: "Description", flex: 0.4 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 0.12
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.3,
      sortable: false,
      renderCell: ({ row }) => (
        <Rating
          sx={{ padding: "0 40px" }}
          size="small"
          name="half-rating"
          readOnly
          defaultValue={row.rating.rate}
          precision={0.5}
        />
      )
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 0.1,
      renderCell: (clickedUser) => (
        <IconButton
          onClick={() => handleOnDeleteClick(clickedUser)}
          aria-label="delete"
          color="primary"
        >
          <DeleteIcon />
        </IconButton>
      ),
      renderHeader: () => {
        return (
          <IconButton onClick={() => deleteSelectedFile()}>
            <DeleteIcon />
          </IconButton>
        );
      }
    }
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        onSelectionModelChange={setSelected}
        selectionModel={selected}
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
