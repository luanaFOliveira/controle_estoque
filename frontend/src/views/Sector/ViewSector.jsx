import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import BaseTable from "../../components/shared/BaseTable";
import { useNavigate, useParams } from "react-router-dom";
import { toastDelete } from "../../components/shared/ToastComponents";
import { toast } from "react-toastify";
import { destroySector, getSector } from "../../services/sectorService";
import { errorToast } from "../../services/api";
import EquipmentTableColumns from "../../components/columns/EquipmentTableColumns";
import UserTableColumns from "../../components/columns/UserTableColumns";

function ViewSector() {
  const navigate = useNavigate();
  const { sectorId } = useParams();
  const [sectorDetail, setSectorDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsEquip = EquipmentTableColumns();
  const columnsUser = UserTableColumns();

  const fetchSectorDetail = async () => {
    setLoading(true);
    try {
      const response = await getSector(sectorId);
      if (response) {
        setSectorDetail(response.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectorDetail();
  }, [sectorId]);

  const handleDestroy = async () => {
    try {
      const response = await destroySector(sectorId);
      if (response) {
        toast.success("Setor deletado com sucesso!");
        navigate("/sectors");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao tentar deletar setor. Por favor, tente novamente.");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      {sectorDetail && (
        <>
          <Grid container justifyContent="space-between">
            <Grid>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                {sectorDetail.name}
              </Typography>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate(`/sectors/edit/${sectorId}`);
                }}
                sx={{ marginRight: 1 }}
              >
                EDITAR SETOR
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  toastDelete({
                    item: "setor",
                    handleClick: handleDestroy,
                  });
                }}
              >
                REMOVER SETOR
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={6}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Usuários do Setor
              </Typography>
              {sectorDetail.users.length > 0 ? (
                <BaseTable
                  rows={sectorDetail.users}
                  getRowId={(row) => row.user_id}
                  columns={columnsUser}
                  checkBox={false}
                  loading={loading}
                  paginationMode="client"
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                />
              ) : (
                <Typography variant="body2">
                  Nenhum usuário encontrado.
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} my={5}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Equipamentos do Setor
              </Typography>
              {sectorDetail.equipments.length > 0 ? (
                <BaseTable
                  rows={sectorDetail.equipments}
                  getRowId={(row) => row.equipment_id}
                  columns={columnsEquip}
                  checkBox={false}
                  loading={loading}
                  paginationMode="client"
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                />
              ) : (
                <Typography variant="body2">
                  Nenhum equipamento encontrado.
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
            onClick={() => navigate("/sectors")}
          >
            Voltar para a Lista de Setores
          </Button>
        </>
      )}
      {loading && (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </Container>
  );
}

export default ViewSector;
