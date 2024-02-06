import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';

export default function BaseTable({rows, columns, checkBox,pageSize,currentPage,handlePageChange,lastPage}) {

  return (
    <DataGrid
    sx={{
      boxShadow: 2,
      border: 2,
    }}
    rows={rows}
    columns={columns}
    paginationMode="server"
    onPaginationModelChange={handlePageChange}
    paginationModel={{
      page: currentPage,
      pageSize: pageSize,
    }}
    {...(checkBox ? { checkboxSelection: true } : {})}  
      
    />
  );
}
