import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import React from "react";

export default function SectorTableColumns() {
  const navigate = useNavigate();

  return [
    {
      field: "sector_id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "name",
      headerName: "Nome",
      width: 270,
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
      width: 200,
      sortable: false,
    },
    {
      field: "equipments_count",
      headerName: "Nº de equipamentos",
      width: 200,
      sortable: false,
    },
  ];
}
