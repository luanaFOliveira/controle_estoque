import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import React from "react";

export default function SectorTableColumns() {
  const navigate = useNavigate();

  return [
    {
      field: "sector_id",
      headerName: "ID",
      flex: 1,
      minWidth: 70,
    },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: (params) => (
        <Link
          component="button"
          onClick={() => {
            navigate(`/sectors/${params.row.sector_id}`);
          }}
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "users",
      headerName: "Nº de pessoas",
      flex: 1,
      minWidth: 110,
      sortable: false,
    },
    {
      field: "equipments_count",
      headerName: "Nº de equipamentos",
      flex: 1,
      minWidth: 140,
      sortable: false,
    },
  ];
}
