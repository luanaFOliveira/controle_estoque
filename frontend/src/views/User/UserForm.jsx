import React, { useState } from "react";
import {Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography} from "@mui/material";
import axiosClient from "../../axios-client";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_admin: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosClient
      .post("/users", formData)
      .then((response) => {
        console.log(response.data);
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
          Criar novo usuário
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            name="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
          />
          <FormControlLabel
              control={
                <Checkbox
                    checked={formData.is_admin}
                    onChange={handleChange}
                    name="is_admin"
                    color="primary"
                />
              }
              label="Administrador"
              sx={{  display: 'flex', justifyContent: 'center' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Criar usuário
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUser;
