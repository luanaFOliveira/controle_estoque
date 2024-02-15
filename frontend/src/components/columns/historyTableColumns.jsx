import { Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EquipmentHistoryTableColumns() {
  const navigate = useNavigate();
  return [
    {
      field: "user",
      headerName: "Usuário",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Link
          component="button"
          onClick={() => {
            navigate(`/users/${params.value.user_id}`);
          }}
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          {params.value.name}
        </Link>
      ),
    },
    {
      field: "equipment_code",
      headerName: "Código do equipamento",
      flex: 1,
      minWidth: 110,
      valueGetter: (params) =>
        params.row.equipment.map((equip) => equip.equipment_code).join(", "),
    },
    {
      field: "created_at",
      headerName: "Criado em",
      flex: 1,
      minWidth: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("pt-BR");
      },
    },
    {
      field: "returned_at",
      headerName: "Data de Devolução",
      flex: 1,
      minWidth: 200,
      valueFormatter: (params) => {
        if (params.value === null) {
          return "Em uso";
        }
        const date = new Date(params.value);
        return date.toLocaleDateString("pt-BR");
      },
    },
  ];
}
