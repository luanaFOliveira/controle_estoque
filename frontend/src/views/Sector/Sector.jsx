import React, { useEffect, useState } from 'react';
import { CircularProgress, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import BaseTable from '../../components/shared/BaseTable';
import axiosClient from '../../axios-client';

function Sector() {
  const [sectors, setSectors] = useState([]);

  const columnsSector = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 170,
      sortable: false,
    },
    {
      field: 'users',
      headerName: 'Nº de pessoas',
      width: 130,
      sortable: false,
    },
    {
      field: 'equipments_count',
      headerName: 'Nº de equipamentos',
      width: 150,
      sortable: false,
    },
  ];

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axiosClient.get('/sectors');
        const sectorsWithId = response.data.data.map((sector) => ({
          ...sector,
          id: sector.sector_id,
        }));
        setSectors(sectorsWithId);
      } catch (error) {
        console.log('error:', error);
      }
    };
    fetchSectors();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <div>
        {sectors.length > 0 ? <BaseTable rows={sectors} columns={columnsSector} checkBox={false} />
          : (
            <Grid item container justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
      </div>
    </Container>
  );
}

export default Sector;
