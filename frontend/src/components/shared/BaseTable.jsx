import * as React from 'react';
import {DataGrid, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport} from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";

export default function BaseTable({
                                      rows, columns, checkBox, rowCount, paginationModel, setPaginationModel, isLoading
                                  }) {
    function CustomToolbar() {
        return (<Grid item container justifyContent="end">
                <GridToolbarColumnsButton/>
                <GridToolbarDensitySelector/>
                <GridToolbarExport/>
            </Grid>);
    }

    return (<DataGrid
        rows={rows}
        columns={columns}
        slots={{
            toolbar: CustomToolbar,
        }}
        disableColumnMenu
        loading={isLoading}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        {...(checkBox ? {checkboxSelection: true} : {})}
        sx={{boxShadow: 2}}
    />);
}
