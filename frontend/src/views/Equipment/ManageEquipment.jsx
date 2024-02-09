import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

const ManageEquipment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [editLoading, setEditloading] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [equipmentBrands, setEquipmentBrands] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    equipment_brand: "",
    equipment_type: "",
    sector: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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

  useEffect(() => {
    const getEquipment = async () => {
      if (params.equipment_id) {
        setEditloading(true);
        try {
          const response = await axiosClient
            .get(`/equipments/${params.equipment_id}`)
            .finally(() => {
              setEditloading(false);
            });
          const equipment = response.data.data;
          setFormData({
            name: equipment.name,
            equipment_brand: equipment.brand,
            equipment_type: equipment.type,
            sector: equipment.sector,
          });
        } catch (error) {
          console.log("Erro ao buscar detalhes do equipamento: ", error);
        }
      }
    };

    getEquipment();
  }, [params.equipment_id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.equipment_id) {
      axiosClient
        .put(`/equipments/${params.equipment_id}`, formData)
        .then((response) => {
          toast.success("Equipamento atualizado com sucesso!");
          navigate(`/equipments`);
        })
        .catch((error) => {
          console.error("Erro ao tentar registrar novo equipamento: ", error);
        });
    } else {
      axiosClient
        .post("/equipments", formData)
        .then((response) => {
          toast.success("Equipamento registrado com sucesso!");
          navigate(`/equipments`);
        })
        .catch((error) => {
          console.error("Erro ao tentar registrar novo equipamento: ", error);
        });
    }
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
          {params.equipment_id
            ? "Editar Equipamento"
            : "Registrar novo equipamento"}
        </Typography>
        {!editLoading ? (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              required
              fullWidth
              label="Nome:"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
            <Autocomplete
              freeSolo
              disablePortal
              options={equipmentBrands}
              value={formData.equipment_brand}
              onChange={(event, newValue) => {
                setFormData({ ...formData, equipment_brand: newValue });
              }}
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
              value={formData.equipment_type}
              onChange={(event, newValue) => {
                setFormData({ ...formData, equipment_type: newValue });
              }}
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
            <FormControl fullWidth>
              <Select
                labelId="sector-select-label"
                id="sector-select"
                value={formData.sector}
                onChange={handleChange}
                name="sector"
              >
                {sectors.map((sector) => (
                  <MenuItem key={sector.name} value={sector.name}>
                    {sector.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              {params.equipment_id
                ? "Atualizar Equipamento"
                : "Registrar equipamento"}
            </Button>
          </Box>
        ) : (
          <Grid item container justifyContent="center" sx={{ m: 10 }}>
            <CircularProgress />
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default ManageEquipment;
