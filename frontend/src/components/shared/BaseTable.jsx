import * as React from "react";
import {DataGrid, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport,} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function BaseTable({
                                      rows,
                                      columns,
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
        const matches = useMediaQuery('(max-width:430px)');

        return (
            !matches ? (
                <Grid item container justifyContent="end">
                    <GridToolbarColumnsButton/>
                    <GridToolbarDensitySelector/>
                    <GridToolbarExport/>
                </Grid>
            ) : null
        );
    }

    return (
        <DataGrid
            autoHeight
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
            pageSizeOptions={[10]}
            sx={{boxShadow: 2, maxWidth: maxWidth, maxHeight: maxHeight, minHeight: minHeight}}
        />
    );
}
