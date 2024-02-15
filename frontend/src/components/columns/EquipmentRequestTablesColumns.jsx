import { StatusField,RequestEquipButtonCell } from '../CustomColumns';


export function EquipmentRequestHistoryTableColumns() {
    return [
      {
        field: "equipment_request_id",
        headerName: "Codigo",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Nome",
        flex: 1,
        renderCell: (params) => (
          <span>{params.row.equipment.name}</span>
        ),
  
      },
      {
        field: "observation",
        headerName: "Observação",
        flex: 1,
      },
      {
        field: "request_motive",
        headerName: "Motivo",
        flex: 1,
      },
      { 
        field: 'status',
        headerName: 'Status', 
        flex:1, 
        renderCell: (params) => <StatusField value={params.row.request_status} />, 
    },
    ];
}


export function EquipmentRequesEquipTableColumns({handleButtonClick}) {
  return [
    {
      field: "equipment_id",
      headerName: "Codigo",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
    },
    {
      field: "brand",
      headerName: "Marca",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
    },
    {
      field: "is_at_office",
      headerName: "Local",
      flex: 1,
      renderCell: (params) => (params.value ? params.row.sector : 'Fora do escritório'),
    },
    { 
      field: 'requestButton',
      headerName: 'Solicitar retirada',
      flex:1,
      renderCell: (params) => (
          <RequestEquipButtonCell onClick={(event) => handleButtonClick(event, params.row)} />
      ),
      align: 'center',
  },
  ];
}

  