import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { toastDelete } from "../../components/shared/ToastComponents";
import BaseTable from "../../components/shared/BaseTable";
import HistoryTableColumns from "../../components/columns/historyTableColumns";
import { errorToast } from "../../services/api";
import { destroyUser, getUser } from "../../services/userService";
import { getUserHistory } from "../../services/historyService";

const ViewUser = () => {
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

  const columnsHistory = HistoryTableColumns();

  useEffect(() => {
    const fetchUserDetail = async () => {
      setLoading(true);
      try {
        const response = await getUser(userId);
        if (response) {
          setUserDetail(response.data);
        }
      } catch (error) {
        console.error(error);
        errorToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [userId]);

  useEffect(() => {
    const fetchUserHistory = async () => {
      setLoading(true);
      try {
        const response = await getUserHistory(userId);
        if (response) {
          setHistory(response.data);
          setRowCount(
            (prevRowCountState) => response.meta.total ?? prevRowCountState,
          );
        }
      } catch (error) {
        console.error(error);
        errorToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [paginationModel.page]);

  const handleDestroy = async () => {
    try {
      const response = await destroyUser(userId);
      if (response) {
        toast.success("Usuário deletado com sucesso!");
        navigate("/users");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Erro ao tentar excluir usuário. Por favor, tente novamente.",
      );
    }
  };

  const UserCard = ({ label, value }) => {
    return (
      <Card
        sx={{
          mb: 2,
          maxWidth: "700px",
        }}
      >
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
        {!loading ? (
          <>
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
                      item: "equipamento",
                      handleClick: handleDestroy,
                    });
                  }}
                >
                  REMOVER
                </Button>
              </Grid>
            </Grid>
            <Grid>
              <UserCard label="Nome do Usuário" value={userDetail.name} />
              <UserCard label="Email do Usuário" value={userDetail.email} />
            </Grid>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mb: 2,
                mt: 5,
              }}
            >
              Histórico do usuário:
            </Typography>
            <BaseTable
              rows={history}
              columns={columnsHistory}
              checkBox={false}
              getRowId={(row) => row.user.user_id}
              rowCount={rowCount}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              isLoading={loading}
              maxWidth={700}
            />
          </>
        ) : (
          <Grid item container justifyContent="center" marginTop={3}>
            <CircularProgress />
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ViewUser;
