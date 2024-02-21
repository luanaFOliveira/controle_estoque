import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import BaseTable from "../../../components/shared/BaseTable";
import { useNavigate } from "react-router-dom";
import SectorTableColumns from "../../../components/columns/SectorTableColumns";
import { indexSectors } from "../../../services/sectorService";
import { errorToast } from "../../../services/api";
import FilterBox from '../../../components/shared/FilterBox';

function SectorList() {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState({
    name:"",
  });

  const columnsSector = SectorTableColumns();

  useEffect(() => {
    fetchSectors();
  }, [paginationModel.page,filter]);

  const fetchSectors = async () => {
    setLoading(true);
    try {
      const page = paginationModel.page + 1;
      const response = await indexSectors({
        page: page,
        name: filter.name,
      });
      if (response) {
        setSectors(response.data);
        setRowCount(
          (prevRowCountState) => response.meta.total ?? prevRowCountState,
        );
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    } finally {
      setLoading(false);
      setFirstLoading(false)
    }
  };

  const handleSearch = (name) => {
    setFilter((prevFilter) => ({ ...prevFilter, name}));
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/sectors/new")}
      >
        Registrar Setor
      </Button>
      {!firstLoading  ? (
        <>
          <FilterBox onSearch={handleSearch} disponibility={false} label='Pesquisar nome do setor'/>
          <BaseTable
            rows={sectors}
            columns={columnsSector}
            getRowId={(row) => row.sector_id}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            loading={loading}
          />
        </>
      ) : (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </Container>
  );
}

export default SectorList;
