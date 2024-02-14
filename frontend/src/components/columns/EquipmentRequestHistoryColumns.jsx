import { useNavigate } from "react-router-dom";
import { StatusField,RequestEquipButtonCell } from '../CustomColumns';
import { Link } from "@mui/material";


export default function EquipmentRequestHistoryTableColumns() {
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
          <Link
            component="button"
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            {params.row.equipment.name}
          </Link>
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
  