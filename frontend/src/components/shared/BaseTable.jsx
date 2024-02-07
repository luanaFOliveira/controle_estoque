import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function BaseTable({
  rows,
  columns,
  checkBox,
  rowCount,
  paginationModel,
  setPaginationModel,
  loading,
}) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      rowCount={rowCount}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      {...(checkBox ? { checkboxSelection: true } : {})}
      sx={{ boxShadow: 2 }}
    />
  );
}