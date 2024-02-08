import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageEquipment = () => {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [equipmentBrands, setEquipmentBrands] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);

  useEffect(() => {
    const getAllSectors = () => {
      axiosClient
        .get("/sectors")
        .then((data) => {
          setSectors(data.data.data);
        })
        .catch((error) => {
          console.log("erro ao buscar setores: ", error);
        });
    };

    const getAllEquipmentInfos = () => {
      axiosClient
        .get("/equipment-details")
        .then((data) => {
          setEquipmentBrands(data.data.equipment_brands);
          setEquipmentTypes(data.data.equipment_types);
        })
        .catch((error) => {
          console.log("erro ao buscar detalhes de equipamentos: ", error);
        });
    };

    getAllEquipmentInfos();
    getAllSectors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      name: form.elements.name.value,
      equipment_type: form.elements.equipment_type.value,
      equipment_brand: form.elements.equipment_brand.value,
      sector: form.elements.sector.value,
    };

    axiosClient
      .post("/equipments", payload)
      .then((response) => {
        toast("Equipamento registrado com sucesso!");
        navigate('/equipments');
      })
      .catch((error) => {
        console.error("Erro ao tentar registrar novo equipamento: ", error);
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
          Registrar novo equipamento
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField required fullWidth label="Nome:" name="name" autoFocus />
          <Autocomplete
            freeSolo
            disablePortal
            options={equipmentBrands}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                required
                fullWidth
                label="Marca do equipamento:"
                name="equipment_brand"
              />
            )}
          />
          <Autocomplete
            freeSolo
            disablePortal
            options={equipmentTypes}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                required
                fullWidth
                label="Tipo do equipamento:"
                name="equipment_type"
              />
            )}
          />
          <InputLabel id="sector-select-label">Setor: *</InputLabel>
          <Select margin="normal" name="sector" required fullWidth>
            {sectors.map((sector) => (
              <MenuItem key={sector.name} value={sector.name}>
                {sector.name}
              </MenuItem>
            ))}
          </Select>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Registrar equipamento
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ManageEquipment;
