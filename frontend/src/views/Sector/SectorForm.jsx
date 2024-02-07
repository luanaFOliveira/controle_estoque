// SectorForm.js
import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import axiosClient from "../../axios-client";
import {useNavigate} from "react-router-dom";

const SectorForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosClient
            .post("/sectors", formData) // Assuming your Laravel API endpoint is '/sectors'
            .then((response) => {
                navigate('/sectors')
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" fontWeight="bold">
                    Criar novo setor
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        autoFocus
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Criar Setor
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SectorForm;
