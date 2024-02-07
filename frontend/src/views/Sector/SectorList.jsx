import React, { useEffect, useState } from "react";
import { CircularProgress, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import axiosClient from "../../axios-client";
import BaseTable from "../../components/shared/BaseTable";

function SectorList() {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columnsSector = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "name",
      headerName: "Nome",
      width: 270,
      sortable: false,
    },
    {
      field: "users",
      headerName: "Nº de pessoas",
      width: 200,
      sortable: false,
    },
    {
      field: "equipments_count",
      headerName: "Nº de equipamentos",
      width: 200,
      sortable: false,
    },
  ];

  const fetchSectors = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/sectors?page=${paginationModel.page + 1}`,
      );
      const sectorsWithId = response.data.data.map((sector) => ({
        ...sector,
        id: sector.sector_id,
      }));
      setSectors(sectorsWithId);
      setRowCount((prevRowCountState) =>
        response.data.meta.total !== undefined
          ? response.data.meta.total
          : prevRowCountState,
      );
    } catch (error) {
      console.error("Error fetching sectors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, [paginationModel.page]);

  return (
    <Container sx={{ mt: 5 }}>
      {sectors.length > 0 ? (
        <BaseTable
          rows={sectors}
          columns={columnsSector}
          checkBox={false}
          rowCount={rowCount}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          loading={loading}
        />
      ) : (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </Container>
  );
}

export default SectorList;