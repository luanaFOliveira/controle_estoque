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
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {
  createEquipment,
  getEquipment,
  getEquipmentDetails,
  updateEquipment,
} from "../../services/equipmentService";
import { errorToast } from "../../services/api";
import { indexSectors } from "../../services/sectorService";

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
    const getAllSectors = async () => {
      try {
        const response = await indexSectors();
        if (response) {
          setSectors(response.data);
        }
      } catch (error) {
        console.log(error);
        errorToast(error);
      }
    };

    const getAllEquipmentInfos = async () => {
      try {
        const response = await getEquipmentDetails();
        if (response) {
          setEquipmentBrands(response.equipment_brands);
          setEquipmentTypes(response.equipment_types);
        }
      } catch (error) {
        console.log(error);
        errorToast(error);
      }
    };

    getAllEquipmentInfos();
    getAllSectors();
  }, []);

  useEffect(() => {
    const returnEquipment = async () => {
      if (params.equipment_id) {
        setEditloading(true);
        try {
          const response = await getEquipment(params.equipment_id);
          const equipment = response.data;
          setFormData({
            name: equipment.name,
            equipment_brand: equipment.brand,
            equipment_type: equipment.type,
            sector: equipment.sector,
          });
        } catch (error) {
          errorToast(error);
          console.log(error);
        } finally {
          setEditloading(false);
        }
      }
    };

    returnEquipment();
  }, [params.equipment_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.equipment_id) {
      try {
        const response = await updateEquipment({
          equipment_id: params.equipment_id,
          formData: formData,
        });
        if (response) {
          toast.sucess("Equipamento atualizado com sucesso!");
          navigate(`/equipments/${response.data.equipment_id}`);
        }
      } catch (error) {
        console.log(error);
        errorToast(error);
      }
    } else {
      try {
        const response = await createEquipment(formData);
        if (response) {
          toast.sucess("Equipamento registrado com sucesso!");
          navigate(`/equipments/${response.data.equipment_id}`);
        }
      } catch (error) {
        console.log(error);
        errorToast(error);
      }
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
