import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { CircularProgress, Container } from '@mui/material';
import BaseTable from '../../components/shared/BaseTable';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';

const columnsEquip = [
  {
    field: 'id',
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
    field: 'brand',
    headerName: 'Marca',
    flex: 1,
    sortable: false
  },
  {
    field: 'type',
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

function EquipmentList() {
  const [equipments, setEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fetchEquipments = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `/equipments?page=${paginationModel.page + 1}`,
      );
      const equipmentsWithId = response.data.data.map((equipment) => ({
        ...equipment,
        id: equipment?.equipment_id,
      }));
      setEquipments(equipmentsWithId);
      setRowCount((prevRowCountState) =>
        response.data.meta.total !== undefined
          ? response.data.meta.total
          : prevRowCountState,
      );
    } catch (error) {
      console.log('error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, [paginationModel.page]);

  return (
    <Container sx={{ mt: 5 }}>
      {equipments.length > 0 ? (
        <BaseTable
          rows={equipments}
          columns={columnsEquip}
          checkBox={false}
          rowCount={rowCount}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          isLoading={isLoading}
        />
      ) : (
        <Grid item container justifyContent="center">
          <CircularProgress/>
        </Grid>
      )}
    </Container>
  );
}

export default EquipmentList;
