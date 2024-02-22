import {Button} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export const ButtonReturn = ({label, redirect}) => {
    const navigate = useNavigate();

    return (<Button
        variant="contained"
        sx={{
            mt: 3,
            mb: 2,
        }}
        onClick={() => navigate(redirect)}
    >
        Voltar para a Lista de {label}
    </Button>);
}