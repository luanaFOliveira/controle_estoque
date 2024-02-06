import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function BaseTable({rows, columns, checkBox, pageSize, pageSizeOptions = [3, 6, 10]}) {

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      {...(checkBox ? { checkboxSelection: true } : {})}
      sx={{boxShadow: 2 }}
    />
  );
}
