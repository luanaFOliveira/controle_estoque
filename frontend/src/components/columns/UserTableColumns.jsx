import { Link } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserTableColumns() {
  const navigate = useNavigate();

  return [
    {
      field: "user_id",
      headerName: "ID de usuário",
      width: 150,
    },
    {
      field: "name",
      headerName: "Nome",
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <Link
          component="button"
          onClick={() => {
            navigate(`/users/${params.row.user_id}`);
          }}
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      sortable: false,
    },
    {
      field: "is_admin",
      headerName: "ADM",
      width: 250,
      renderCell: (params) => (params.value ? <CheckIcon /> : <CloseIcon />),
      sortable: false,
    },
  ];
}
