import { Link } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EquipmentTableColumns() {
  const navigate = useNavigate();

  return [
    { field: "equipment_id", headerName: "Código", width: 80 },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link
          component="button"
          onClick={() => {
            navigate(`/equipments/${params.row.equipment_id}`);
          }}
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          {params.row.name}
        </Link>
      ),
    },
    { field: "brand", headerName: "Marca", flex: 1, sortable: false },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      sortable: false,
    },
    {
      field: "is_at_office",
      headerName: "Local",
      flex: 1,
      sortable: false,
      renderCell: (params) =>
        params.value ? params.row.sector : "Fora do escritório",
    },
    {
      field: "is_available",
      headerName: "Disponível",
      flex: 1,
      renderCell: (params) => (params.value ? <CheckIcon /> : <CloseIcon />),
    },
  ];
}
