import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import axiosClient from '../../axios-client';
import { toast } from 'react-toastify';
import { toastDelete } from '../../components/shared/ToastComponents';
import BaseTable from '../../components/shared/BaseTable';

const ViewEquipment = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const columnsHistory = [
    {
      field: 'user',
      headerName: 'Usuário',
      width: 70,
    },
    {
      field: 'equipment_code',
      headerName: 'Código do equipamento',
      width: 200,
    },
    {
      field: 'created_at',
      headerName: 'Criado em',
      width: 100
    },
    {
      field: 'returned_at',
      headerName: 'Devolvido em',
      width: 120
    },
  ];

  const fetchUserDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/users/${userId}`);
      setUserDetail(response.data.data);
    } catch (error) {
      console.error('Error fetching user detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserHistory = async () => {
    setLoading(true);
    await axiosClient
      .get(`/history/users?user_id=${userId}`)
      .then((response) => {
        setHistory(response.data.data);
        setRowCount(
          (prevRowCountState) =>
            response.data.meta.total ?? prevRowCountState,
        );
      })
      .catch((error) => {
        console.log("Erro ao buscar histórico do usuário: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserDetail();
  }, [userId]);

  useEffect(() => {
    fetchUserHistory();
  }, [paginationModel.page]);

  const handleDestroy = async () => {
    await axiosClient
      .delete(`/users/${userId}`)
      .then(() => {
        toast.success('Usuário deletado com sucesso!');
        navigate('/users');
      })
      .catch((error) => {
        console.log('Erro ao tentar excluir usuário: ', error);
        toast.error(
          'Erro ao tentar excluir usuário. Por favor, tente novamente.',
        );
      });
  };

  const UserCard = ({
    label,
    value
  }) => {
    return (
      <Card sx={{
        mb: 2,
        maxWidth: '700px'
      }}>
        <CardContent>
          <Grid container>
            <Typography variant="body2" width="250px">
              {label}:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {value}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Container component="main" maxWidth="sx">
        <Grid container justifyContent="space-between" marginTop={4}>
          <Grid>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
              Usuário:
            </Typography>
          </Grid>
          <Grid mb={2}>
            <Button
              variant="contained"
              sx={{ marginRight: 1 }}
              onClick={() => {
                navigate(`/users/edit/${userId}`);
              }}
            >
              EDITAR
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                toastDelete({
                  item: 'equipamento',
                  handleClick: handleDestroy,
                });
              }}
            >
              REMOVER
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <UserCard label="Nome do Usuário" value={userDetail.name}/>
          <UserCard label="Email do Usuário" value={userDetail.email}/>
        </Grid>
        <Typography variant="h4" fontWeight="bold" sx={{
          mb: 2,
          mt: 5
        }}>
          Histórico do usuário:
        </Typography>
        <BaseTable
          rows={history}
          columns={columnsHistory}
          checkBox={false}
          rowCount={rowCount}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          isLoading={loading}
          maxWidth={700}
        />
        {loading && (
          <Grid item container justifyContent="center">
            <CircularProgress/>
          </Grid>
        )}
      </Container>
    </>
  );
};
export default ViewEquipment;
