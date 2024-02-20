import { StatusField,RequestEquipButtonCell } from '../CustomColumns';


export function EquipmentRequestHistoryTableColumns() {
    return [
      {
        field: "equipment_code",
        headerName: "Codigo",
        flex: 1,
        minWidth: 100,
        sortable: false,
        renderCell: (params) => (
          <span>{params.row.equipment.equipment_code}</span>
        ),
      },
      {
        field: "name",
        headerName: "Nome",
        flex: 1,
        minWidth: 100,
        sortable: false,
        renderCell: (params) => (
          <span>{params.row.equipment.name}</span>
        ),

      },
      {
        field: "sector",
        headerName: "Setor",
        flex: 1,
        minWidth: 200,
        sortable: false,
      },
      {
        field: "observation",
        headerName: "Observação",
        minWidth: 150,
        flex: 1,
        sortable: false,
      },
      {
        field: "request_motive",
        headerName: "Motivo",
        minWidth: 150,
        flex: 1,
        sortable: false,
      },
      {
        field: 'status',
        headerName: 'Status',
        flex:1,
        minWidth: 100,
        sortable: false,
        renderCell: (params) => <StatusField value={params.row.request_status} />,
      },
      {
        field:'deleted_at',
        headerName: 'Data de devolução',
        flex:1,
        minWidth: 200,
        sortable: false,
        renderCell: (params) => (params.value ? new Date(params.value).toLocaleString() : 'Não devolvido'),
      }
    ];
}


export function EquipmentRequestEquipTableColumns({handleButtonClick}) {
  return [
    {
      field: "equipment_code",
      headerName: "Codigo",
      flex: 1,
      minWidth: 100,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      minWidth: 140,
      sortable: false,
    },
    {
      field: "brand",
      headerName: "Marca",
      flex: 1,
      minWidth: 100,
      sortable: false,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      minWidth: 150,
      sortable: false,
    },
    {
      field: "is_at_office",
      headerName: "Local",
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (params.value ? params.row.sector : 'Fora do escritório'),
    },
    {
      field: 'requestButton',
      headerName: 'Solicitar retirada',
      flex:1,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
          <RequestEquipButtonCell onClick={(event) => handleButtonClick(event, params.row)} />
      ),
      align: 'center',
  },
  ];
}

