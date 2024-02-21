import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container } from "@mui/material";
import BaseTable from "../../../components/shared/BaseTable";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { indexEquipments } from "../../../services/equipmentService";
import { errorToast } from "../../../services/api";
import EquipmentTableColumns from "../../../components/columns/EquipmentTableColumns";
import FilterBox from '../../../components/shared/FilterBox';

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
  const [filter, setFilter] = useState({
    equipment_code: "none",
    availability: "all",
  });


  const columnsEquip = EquipmentTableColumns({ user_admin: true });

  useEffect(() => {
    fetchEquipments();
  }, [paginationModel.page, filter]);

  const fetchEquipments = async () => {
    setIsLoading(true);
    try {
      const page = paginationModel.page + 1;
      const response = await indexEquipments({
        page,
        availability: filter.availability,
        equipment_code: filter.equipment_code,
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

  const handleSearch = (equipment_code) => {
    setFilter((prevFilter) => ({ ...prevFilter, equipment_code }));
  };

  const handleAvailabilityChange = (availability) => {
    setFilter((prevFilter) => ({ ...prevFilter, availability }));
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/new-equipment")}
      >
        Registrar novo equipamento
      </Button>
      {firstLoading ? (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <FilterBox onSearch={handleSearch} onAvailabilityChange={handleAvailabilityChange} disponibility={true} 
                      label='Pesquisar Código do equipamento' disponibilityLabels={["Disponivel","Não disponivel"]} />
          <BaseTable
            rows={equipments}
            columns={columnsEquip}
            getRowId={(row) => row.equipment_id}
            rowCount={rowCount}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            isLoading={isLoading}
          />
        </>
      )}
    </Container>
  );
}
