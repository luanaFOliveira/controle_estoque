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
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import { toastDelete } from "../../components/shared/ToastComponents";
import BaseTable from "../../components/shared/BaseTable";

const ViewEquipment = () => {
  const params = useParams();
  const [firstLoading, setFirstLoading] = useState(true);
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState({});
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columnsHistory = [
    {
      field: "user",
      headerName: "Usuário",
      width: 70,
    },
    {
      field: "equipment_code",
      headerName: "Código do equipamento",
      width: 200,
    },
    { field: "created_at", headerName: "Criado em", width: 100 },
    { field: "returned_at", headerName: "Devolvido em", width: 120 },
  ];

  useEffect(() => {
    const equipment = async () => {
      await axiosClient
        .get(`/equipments/${params.equipment_id}`)
        .then((response) => {
          setEquipment(response.data.data);
        })
        .catch((error) => {
          console.log("Erro ao buscar equipamento: ", error);
        })
        .finally(() => {
          setFirstLoading(false);
        });
    };

    equipment();
  }, []);

  useEffect(() => {
    const history = async () => {
      setIsLoading(true);
      await axiosClient
        .get(`/history/equipments?equipment_id=${params.equipment_id}`)
        .then((response) => {
          setHistory(response.data.data);
          setRowCount(
            (prevRowCountState) =>
              response.data.meta.total ?? prevRowCountState,
          );
        })
        .catch((error) => {
          console.log("Erro ao buscar histórico do equipamento: ", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    history();
  }, [paginationModel.page]);

  const handleDestroy = async () => {
    await axiosClient
      .delete(`/equipments/${params.equipment_id}`)
      .then(() => {
        toast("Equipamento deletado com sucesso!");
        navigate("/equipments");
      })
      .catch((error) => {
        console.log("Erro ao tentar excluir equipamento: ", error);
        toast(
          "Erro ao tentar excluir equipamento. Por favor, tente novamente.",
        );
      });
  };

  const EquipmentCard = ({ label, value }) => {
    return (
      <Card sx={{ mb: 2, maxWidth: "700px" }}>
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
      {!firstLoading ? (
        <Container component="main" maxWidth="sx">
          <Grid container justifyContent="space-between" marginTop={4}>
            <Grid>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                Equipamento:
              </Typography>
            </Grid>
            <Grid mb={2}>
              <Button
                variant="contained"
                sx={{ marginRight: 1 }}
                onClick={() => {
                  navigate(`/edit-equipment/${params.equipment_id}`);
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
            <EquipmentCard
              label="Código do Equipamento"
              value={equipment.equipment_id}
            />
            <EquipmentCard label="Nome do Equipamento" value={equipment.name} />
            <EquipmentCard
              label="Marca do Equipamento"
              value={equipment.brand}
            />
            <EquipmentCard label="Tipo de Equipamento" value={equipment.type} />
            <EquipmentCard label="Setor" value={equipment.sector} />
            <EquipmentCard
              label="Status"
              value={
                equipment.is_available
                  ? "Disponível para uso"
                  : "Atualmente em uso"
              }
            />
            <EquipmentCard
              label="Localização Atual"
              value={
                equipment.is_at_office ? "No Escritório" : "Em Home Office"
              }
            />
          </Grid>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, mt: 5 }}>
            Histórico do equipamento:
          </Typography>
          <BaseTable
            rows={history}
            columns={columnsHistory}
            checkBox={false}
            rowCount={rowCount}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            isLoading={isLoading}
            maxWidth={700}
          />
        </Container>
      ) : (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </>
  );
};
export default ViewEquipment;
