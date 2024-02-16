import { Link } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EquipmentTableColumns({user_admin}) {
  const navigate = useNavigate();

  let columns = [
    { field: "equipment_id", headerName: "Código", width: 80 },
  ];

  if(user_admin == true) {
    columns.push({
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
    })
  }else if(user_admin == false){
    columns.push({
      field: "name",
      headerName: "Nome",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <span>{params.row.name}</span>
      ),
    })
  }
  let newColumns = [
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
  ]

  columns.push(...newColumns);

  return columns;
}
