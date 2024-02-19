import * as React from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";

export default function BaseTable({
  rows,
  columns,
  checkBox,
  rowCount,
  paginationModel,
  setPaginationModel,
  paginationMode,
  isLoading,
  getRowId,
  maxWidth,
  maxHeight,
  minHeight,
  initialState,
}) {
  function CustomToolbar() {
    return (
      <Grid item container justifyContent="end">
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Grid>
    );
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      slots={{
        toolbar: CustomToolbar,
      }}
      localeText={{
        toolbarColumns: "Colunas",
        columnsPanelTextFieldPlaceholder: "Título da coluna",
        columnsPanelTextFieldLabel: "Encontrar coluna",
        columnsPanelHideAllButton: "Esconder todos",
        columnsPanelShowAllButton: "Mostrar todos",
        toolbarDensity: "Densidade",
        toolbarDensityCompact: "Compacto",
        toolbarDensityStandard: "Padrão",
        toolbarDensityComfortable: "Confortável",
        toolbarExport: "Exportar",
        toolbarExportCSV: "Baixar como CSV",
        toolbarExportPrint: "Printar",
        noRowsLabel: "Nenhum dado encontrado.",
      }}
      disableColumnMenu
      loading={isLoading}
      rowCount={rowCount}
      getRowId={getRowId}
      initialState={initialState}
      paginationMode={paginationMode}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      //pageSizeOptions={[5, 10]}
      {...(checkBox ? { checkboxSelection: true } : {})}
      sx={{ boxShadow: 2, maxWidth: maxWidth, maxHeight: maxHeight, minHeight: minHeight}}
    />
  );
}
