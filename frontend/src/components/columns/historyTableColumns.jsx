import {Link} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function HistoryTableColumns(type) {
    const navigate = useNavigate();

    let columns = [];

    if (type === 'equipment') {
        columns.push({
            field: "user",
            headerName:"Usuário",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
            <Link
                component="button"
                onClick={() => {
                    navigate(`/users/${params.row.user.user_id}`);
                }}
                underline="hover"
                sx={{cursor: "pointer"}}
            >
                {params.row.user.name}
            </Link>
            ),
        });
    }else if(type === 'user'){
        columns.push({
            field: "equipment",
            headerName: "Equipamento",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => (
            <Link
                component="button"
                onClick={() => {
                    navigate(`/equipments/${params.row.equipment.equipment_id}`);
                }}
                underline="hover"
                sx={{cursor: "pointer"}}
            >
                {params.row.equipment.equipment_code}
            </Link>
            ),
        });
    }

    let newColumns = [
        {
            field: "created_at", 
            headerName: "Criado em", 
            flex: 1, 
            minWidth: 150, 
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString("pt-BR");
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
                return date.toLocaleString("pt-BR");
            },
        },
    ];

    columns.push(...newColumns);
    return columns;
}



