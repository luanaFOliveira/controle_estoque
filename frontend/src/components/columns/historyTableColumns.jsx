import {Link} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function HistoryTableColumns(type) {
    const navigate = useNavigate();
    return [{
        field: type === 'equipment' ? "user" : "equipment",
        headerName: type === 'equipment' ? "Usuário" : "Equipamento",
        flex: 1,
        minWidth: 100,
        renderCell: (params) => (<Link
            component="button"
            onClick={() => {
                navigate(`/${type === 'equipment' ? 'users' : 'equipments'}/${params.value[type === 'equipment' ? 'user_id' : 'equipment_id']}`);
            }}
            underline="hover"
            sx={{cursor: "pointer"}}
        >
            {params.value.name}
        </Link>),
    }, {
        field: "created_at", headerName: "Criado em", flex: 1, minWidth: 150, valueFormatter: (params) => {
            const date = new Date(params.value);
            return date.toLocaleString("pt-BR");
        },
    }, {
        field: "returned_at", headerName: "Data de Devolução", flex: 1, minWidth: 200, valueFormatter: (params) => {
            if (params.value === null) {
                return "Em uso";
            }
            const date = new Date(params.value);
            return date.toLocaleString("pt-BR");
        },
    },];
}



