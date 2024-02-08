// SectorForm.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import axiosClient from '../../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SectorForm = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (sectorId) {
      axiosClient.get(`/sectors/${sectorId}`)
        .then((data) => {
          setFormData({
            name: data.data.data.name
          });
        });
    }
  }, [sectorId]);

  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sectorId) {
      axiosClient
        .put(`/sectors/${sectorId}`, formData)
        .then(() => {
          toast('Setor atualizado com sucesso!');
          navigate('/sectors');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axiosClient
        .post('/sectors', formData)
        .then((response) => {
          toast('Setor criado com sucesso!');
          navigate('/sectors');
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
          Criar novo setor
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={formData.name}
            label="Name"
            name="name"
            autoFocus
            onChange={handleChange}
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
            Criar Setor
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SectorForm;
