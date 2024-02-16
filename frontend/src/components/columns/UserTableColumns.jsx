import { Link } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserTableColumns({user_admin}) {
  const navigate = useNavigate();

  let columns = [
    { field: "user_id", headerName: "ID de usuário", flex: 1, minWidth: 100 },
  ];

  if(user_admin == true) {
    columns.push({
      field: "name",
      headerName: "Nome",
      flex: 1,
      minWidth: 200,
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
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      sortable: false,
    },
    {
      field: "is_admin",
      headerName: "ADM",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (params.value ? <CheckIcon /> : <CloseIcon />),
      sortable: false,
    },
  ];

  columns.push(...newColumns);
  return columns;

}
