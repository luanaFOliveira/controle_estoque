import React ,{ useEffect }from 'react';
import BaseTable from '../components/BaseTable';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const columns = [
    { field: 'id', headerName: 'Codigo', width: 70,},
    { field: 'name', headerName: 'Nome', width: 170,sortable: false,},
    { field: 'brand', headerName: 'Marca', width: 130,sortable: false,},
    { field: 'type', headerName: 'Tipo', width: 130,sortable: false,},
    { field: 'location', headerName: 'Local', width: 130,sortable: false,},
    {
        field: 'editButton',
        headerName: 'Solicitar retirada',
        width: 130,
        renderCell: (params) => (
            <IconButton aria-label="solicitar" onClick={handleClick}>
                <AddCircleIcon />
            </IconButton>
            
        ),
        sortable: false,
        align: 'center',
    },
  ];
  
  const rows = [
    { id: 1, name: 'Ideapad gaming 3i', brand: 'Lenovo', type: 'Notebook',location:'Escritorio' },
    { id: 2, name: 'Nitro 5', brand: 'Acer', type: 'Notebook',location:'Escritorio' },
    { id: 3, name: 'Inspiron 15', brand: 'Dell', type: 'Notebook',location:'Home Office' },
    { id: 4, name: 'Galaxy Book 2', brand: 'Samsung', type: 'Notebook',location:'Home Office' },
  ];
  

export default function EquipmentRequestPage() {
    
    return(<>
        <div style={{ height: 350, width: '100%' }}>
            <BaseTable rows={rows} columns={columns} checkBox={false} pageSize={5} pageSizeOption={[5, 10, 20]} />
        </div>
    </>);

};