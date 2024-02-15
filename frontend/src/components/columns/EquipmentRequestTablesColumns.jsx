import { StatusField,RequestEquipButtonCell } from '../CustomColumns';


export function EquipmentRequestHistoryTableColumns() {
    return [
      {
        field: "equipment_request_id",
        headerName: "Codigo",
        width: 70,
      },
      {
        field: "name",
        headerName: "Nome",
        width: 200,
        renderCell: (params) => (
          <span>{params.row.equipment.name}</span>
        ),
  
      },
      {
        field: "observation",
        headerName: "Observação",
        width: 200,
      },
      {
        field: "request_motive",
        headerName: "Motivo",
        width: 200,
      },
      { 
        field: 'status',
        headerName: 'Status', 
        flex:1, 
        renderCell: (params) => <StatusField value={params.row.request_status} />, 
        sortable: false, 
        selectable: false, 
    },
    ];
}


export function EquipmentRequesEquipTableColumns({handleButtonClick}) {
  return [
    {
      field: "equipment_id",
      headerName: "Codigo",
      width: 80,
    },
    {
      field: "name",
      headerName: "Nome",
      width: 200,
    },
    {
      field: "brand",
      headerName: "Marca",
      width: 200,
    },
    {
      field: "type",
      headerName: "Tipo",
      width: 200,
    },
    {
      field: "is_at_office",
      headerName: "Local",
      width: 200,
      renderCell: (params) => (params.value ? params.row.sector : 'Fora do escritório'),
    },
    { 
      field: 'requestButton',
      headerName: 'Solicitar retirada',
      flex:1,
      renderCell: (params) => (
          <RequestEquipButtonCell onClick={(event) => handleButtonClick(event, params.row)} />
      ),
      sortable: false,
      align: 'center',
  },
  ];
}

  