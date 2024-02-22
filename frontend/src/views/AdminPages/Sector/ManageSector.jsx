import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { errorToast } from "../../../services/api";
import {
  createSector,
  getSector,
  updateSector,
} from "../../../services/sectorService";
import Grid from "@mui/material/Grid";

const ManageSector = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (sectorId) {
      setLoading(true);
      const fetchSector = async () => {
        try {
          await getSector(sectorId)
            .then((res) => {
              setFormData({
                name: res.data.name,
              });
            });
        } catch (error) {
          console.error(error);
          errorToast(error);
        } finally {
          setLoading(false);
        }
      };

      fetchSector();
    }
  }, [sectorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    if (trimmedName.length < 4 || trimmedName.length > 20) {
      toast.error("O nome do setor deve ter entre 4 e 20 caracteres.");
      return;
    }

    if (sectorId) {
      try {
        const response = await updateSector({
          sector_id: sectorId,
          formData: formData,
        });
        if (response) {
          toast.success("Setor atualizado com sucesso!");
          navigate(`/sectors/${sectorId}`);
        }
      } catch (error) {
        console.error(error);
        errorToast(error);
      }
    } else {
      try {
        await createSector(formData)
          .then((res) => {
            toast.success("Setor criado com sucesso!");
            navigate(`/sectors/${res.data.sector_id}`);
          });
      } catch (error) {
        console.error(error);
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
          {sectorId ? "Editar setor" : "Criar novo setor"}
        </Typography>
        {!loading ? (
          <>
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
                  mb: 2,
                }}
              >
                {sectorId ? "Editar Setor" : "Criar Setor"}
              </Button>
            </Box>
          </>
        ) : (
          <Grid item container justifyContent="center" sx={{ m: 10 }}>
            <CircularProgress />
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default ManageSector;
