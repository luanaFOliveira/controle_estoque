import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container, Link } from "@mui/material";
import BaseTable from "../../components/shared/BaseTable";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { indexEquipments } from "../../services/equipmentService";
import { errorToast } from "../../services/api";

export default function EquipmentList() {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columnsEquip = [
    { field: "equipment_id", headerName: "Código", width: 80 },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link
          component="button"
          onClick={() => {
            navigate(`/equipments/${params.row.equipment_id}`);
          }}
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          {params.row.name}
        </Link>
      ),
    },
    { field: "brand", headerName: "Marca", flex: 1, sortable: false },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      sortable: false,
    },
    {
      field: "is_at_office",
      headerName: "Local",
      flex: 1,
      sortable: false,
      renderCell: (params) =>
        params.value ? params.row.sector : "Fora do escritório",
    },
    {
      field: "is_available",
      headerName: "Disponível",
      flex: 1,
      renderCell: (params) => (params.value ? <CheckIcon /> : <CloseIcon />),
    },
  ];

  useEffect(() => {
    const fetchEquipments = async () => {
      setIsLoading(true);
      try {
        const page = paginationModel.page + 1;
        const response = await indexEquipments(page);

        setEquipments(response.data);
        setRowCount(
          (prevRowCountState) => response.meta.total ?? prevRowCountState,
        );
      } catch (error) {
        errorToast(error);
        console.log("error:", error);
      } finally {
        setIsLoading(false);
        setFirstLoading(false);
      }
    };

    fetchEquipments().then((r) => {});
  }, [paginationModel.page]);

  return (
    <Container sx={{ mt: 5 }}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/new-equipment")}
      >
        Registrar novo equipamento
      </Button>
      {firstLoading > 0 ? (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <BaseTable
          rows={equipments}
          columns={columnsEquip}
          checkBox={false}
          getRowId={(row) => row.equipment_id}
          rowCount={rowCount}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
}
