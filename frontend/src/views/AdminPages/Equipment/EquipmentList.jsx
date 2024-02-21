import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container } from "@mui/material";
import BaseTable from "../../../components/shared/BaseTable";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { indexEquipments } from "../../../services/equipmentService";
import { errorToast } from "../../../services/api";
import EquipmentTableColumns from "../../../components/columns/EquipmentTableColumns";

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

  const columnsEquip = EquipmentTableColumns({ user_admin: true });

  //const availability = false;
  //const equipment_code = "HK-6281";

  useEffect(() => {
    const fetchEquipments = async () => {
      setIsLoading(true);
      try {
        const page = paginationModel.page + 1;
        const response = await indexEquipments({
          page:page,
          //availability: availability,
          //equipment_code: equipment_code,
        });

        setEquipments(response.data);
        setRowCount(
          (prevRowCountState) => response.meta.total ?? prevRowCountState,
        );
      } catch (error) {
        errorToast(error);
        console.error("error:", error);
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
