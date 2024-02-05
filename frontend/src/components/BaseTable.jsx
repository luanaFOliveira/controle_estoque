import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function BaseTable({rows, columns, checkBox,pageSize,pageSizeOption}) {

  return (
    <DataGrid
    rows={rows}
    columns={columns}
    initialState={{
        pagination: {
        paginationModel: { page: 0, pageSize: pageSize },
        },
    }}
    pageSizeOptions={pageSizeOption}
    {...(checkBox ? { checkboxSelection: true } : {})}  
      
    />
  );
}
