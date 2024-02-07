import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel, InputLabel, MenuItem, Select,
  TextField,
  Typography,
} from '@mui/material';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    is_admin: false,
    sectors: [],
  });

  useEffect(() => {
    getAllSectors();
  }, []);

  const getAllSectors = () => {
    axiosClient.get('/sectors')
      .then((data) => {
        setSectors(data.data.data);
      });
  };

  const handleSelectChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      sectors: event.target.value,
    }));
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      checked
    } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      sectors: formData.sectors
    })
    axiosClient
      .post('/users', {
        ...formData,
        sectors: formData.sectors
      })
      .then(() => {
        navigate('/users');
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            name="password_confirmation"
            type="password"
            onChange={handleChange}
          />
          <InputLabel id="sector-select-label">Setores</InputLabel>
          <Select
            labelId="sector-select-label"
            id="sector-select"
            multiple
            value={formData.sectors}
            onChange={handleSelectChange}
            fullWidth
          >
            {sectors.map((sector) => (
              <MenuItem key={sector.name} value={sector.name}>
                {sector.name}
              </MenuItem>
            ))}
          </Select>
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
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2
            }}
          >
            Criar usuário
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserForm;
