

export function MyEquipmentAvailableTableColumns() {
  return [  
    { 
        field: 'id', 
        headerName: 'Codigo',
        width: 80 
    },
    { 
        field: 'name', 
        headerName: 'Nome', 
        width: 200,
    },
    { 
        field: 'brand', 
        headerName: 'Marca', 
        width: 200,
    },
    { 
        field: 'type', 
        headerName: 'Tipo', 
    },
    {
        field: "is_at_office",
        headerName: "Local",
        width: 200,
        renderCell: (params) =>
            params.value ? params.row.sector : "Fora do escritório",
    },
    
];
}

export function MyEquipmentUnavailableTableColumns() {
    return [  
    { 
        field: 'id', 
        headerName: 'Codigo',
        width: 80 
    },
    { 
        field: 'name', 
        headerName: 'Nome', 
        width: 200,
    },
    { 
        field: 'brand', 
        headerName: 'Marca', 
        width: 200,
    },
    { 
        field: 'type', 
        headerName: 'Tipo', 
    },
    {
        field: "is_at_office",
        headerName: "Local",
        width: 200,
        renderCell: (params) =>
            params.value ? params.row.sector : "Fora do escritório",
    },
    { 
        field: 'created_at', 
        headerName: 'Data de retirada', 
        width: 200,
    },
    { 
        field: 'returned_at', 
        headerName: 'Data de devolucao', 
        width: 200,
    },
      
  ];
  }