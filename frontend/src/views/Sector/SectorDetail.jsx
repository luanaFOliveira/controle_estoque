// SectorDetail.js
import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import axiosClient from '../../axios-client';
import BaseTable from '../../components/shared/BaseTable';
import { useNavigate, useParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { toastDelete } from '../../components/shared/ToastComponents';
import { toast } from 'react-toastify';

export const columnsEquip = [
  {
    field: 'equipment_id',
    headerName: 'Código',
    width: 80
  },
  {
    field: 'name',
    headerName: 'Nome',
    flex: 1,
    sortable: false,
  },
  {
    field: 'equipment_brand',
    headerName: 'Marca',
    flex: 1,
    sortable: false
  },
  {
    field: 'equipment_type',
    headerName: 'Tipo',
    flex: 1,
    sortable: false,
  },
  {
    field: 'is_at_office',
    headerName: 'Local',
    flex: 1,
    sortable: false,
    renderCell: (params) =>
      params.value ? params.row.sector : 'Fora do escritório',
  },
  {
    field: 'is_available',
    headerName: 'Disponível',
    flex: 1,
    renderCell: (params) => (params.value ? <CheckIcon/> : <CloseIcon/>),
  },
];
const columnsUser = [
  {
    field: 'user_id',
    headerName: 'ID de usuário',
    width: 150,
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 250,
    sortable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    sortable: false,
  },
  {
    field: 'is_admin',
    headerName: 'ADM',
    width: 250,
    sortable: false,
  },
];

function SectorDetail() {
  const navigate = useNavigate();
  const { sectorId } = useParams();
  const [sectorDetail, setSectorDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSectorDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/sectors/${sectorId}`);
      setSectorDetail(response.data.data);
    } catch (error) {
      console.error('Error fetching sector detail:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectorDetail();
  }, [sectorId]);

  const handleDestroy = () => {
    axiosClient
      .delete(`/sectors/${sectorId}`)
      .then(() => {
        toast.success('Setor deletado com sucesso!');
        navigate('/sectors');
      })
      .catch((error) => {
        console.error('Erro ao tentar deletar setor:', error);
        toast.error(
          "Erro ao tentar deletar setor. Por favor, tente novamente.",
        );
      });
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
                <Typography variant="body2">Nenhum usuário encontrado.</Typography>
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
                <Typography variant="body2">Nenhum equipamento encontrado.</Typography>
              )}
            </Grid>
          </Grid>
        </>
      )}
      {loading && (
        <Grid item container justifyContent="center">
          <CircularProgress/>
        </Grid>
      )}
      <Button
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
        }}
        onClick={() => navigate('/sectors')}
      >
        Voltar para a Lista de Setores
      </Button>
    </Container>
  );

}

export default SectorDetail;
