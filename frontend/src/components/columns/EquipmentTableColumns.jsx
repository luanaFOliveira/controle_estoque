import { Box, Link } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EquipmentTableColumns({user_admin}) {
  const navigate = useNavigate();

  let columns = [];

  if(user_admin === true) {
    columns.push({
      field: "equipment_code",
      headerName: "Código",
      flex: 1,
      minWidth: 100,
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
          {params.row.equipment_code}
        </Link>
      ),
    });

  }else if(user_admin === false){
    columns.push({
      field: "equipment_code",
      headerName: "Código",
      flex: 1,
      minWidth: 100,
      sortable: false,
    });
  }

  let newColumns = [
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      minWidth: 200,
      sortable: false,
    },
    {
      field: "brand",
      headerName: "Marca",
      flex: 1,
      sortable: false,
      minWidth: 150,
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
      minWidth: 200,
      sortable: false,
      renderCell: (params) =>
        params.value ? params.row.sector : "Fora do escritório",
    },
    {
      field: "is_available",
      headerName: "Disponível",
      flex: 1,
      minWidth: 140,
      sortable: false,
      renderCell: (params) =>
        params.value ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CheckIcon />
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CloseIcon />
          </Box>
        ),
    },
  ];

  columns.push(...newColumns);
  return columns;
}
