import {Link} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function UserTableColumns({user_admin}) {
    const navigate = useNavigate();

    let columns = [];

    if (user_admin === true) {
        let newColumns = [
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
                            navigate(`/users/${params.row.user_id}`);
                        }}
                        underline="hover"
                        sx={{cursor: "pointer"}}
                    >
                        {params.row.name}
                    </Link>
                ),
            },
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
                renderCell: (params) => (params.value ? <CheckIcon/> : <CloseIcon/>),
                sortable: false,
            },
        ];
        columns.push(...newColumns);
    } else if (user_admin === false) {
        columns.push({
            field: "name",
            headerName: "Nome",
            flex: 1,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => (
                <span>{params.row.name}</span>
            ),
        })
    }

    return columns;
}
