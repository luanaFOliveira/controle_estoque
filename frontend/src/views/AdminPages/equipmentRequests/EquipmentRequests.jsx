import React, { useEffect, useState } from "react";
import { errorToast } from "../../../services/api";
import { indexEquipmentRequests } from "../../../services/equipmentRequestService";
import { CircularProgress, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import BaseTable from "../../../components/shared/BaseTable";
import RequestTableColumns from "../../../components/columns/RequestTableColumns";

const EquipmentRequests = () => {
  const [firstLoading, setIFirstLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoadingPending, setIsLoadingPending] = useState(true);
  const [pendingRowCount, setPendingRowCount] = useState(0);
  const [pendingPaginationModel, setPendingPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [processedRequests, setProcessedRequests] = useState([]);
  const [isLoadingProcessed, setIsLoadingProcessed] = useState(true);
  const [processedRowCount, setProcessedRowCount] = useState(0);
  const [processedPaginationModel, setProcessedPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const pendingRequestsColumns = RequestTableColumns({
    is_handled_table: true,
    setReload: setReload,
  });
  const processedRequestsColumns = RequestTableColumns({
    is_handled_table: false,
  });

  useEffect(() => {
    const getPendingRequests = async () => {
      setIsLoadingPending(true);
      try {
        const page = pendingPaginationModel.page + 1;
        const response = await indexEquipmentRequests({
          filter: { status: "Pendente" },
          page: page,
        });
        if (response) {
          setPendingRequests(response.data);
          setPendingRowCount(
            (prevRowCountState) => response.meta.total ?? prevRowCountState,
          );
        }
      } catch (error) {
        console.error(error);
        errorToast(error);
      } finally {
        setIsLoadingPending(false);
        setIFirstLoading(false);
      }
    };

    getPendingRequests();
  }, [pendingPaginationModel.page, reload]);

  useEffect(() => {
    const getProcessedRequests = async () => {
      setIsLoadingProcessed(true);
      try {
        const page = processedPaginationModel.page + 1;
        const response = await indexEquipmentRequests({
          filter: { status: { $ne: "pendente" } },
          page: page,
        });
        if (response) {
          setProcessedRequests(response.data);
          setProcessedRowCount(
            (prevRowCountState) => response.meta.total ?? prevRowCountState,
          );
        }
      } catch (error) {
        console.error(error);
        errorToast(error);
      } finally {
        setIsLoadingProcessed(false);
        setIFirstLoading(false);
      }
    };

    getProcessedRequests();
  }, [processedPaginationModel.page, reload]);

  return (
    <Container sx={{ mt: 5 }}>
      {firstLoading ? (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Solicitações pendentes:
          </Typography>
          <BaseTable
            rows={pendingRequests}
            columns={pendingRequestsColumns}
            checkBox={false}
            getRowId={(row) => row.equipment_request_id}
            rowCount={pendingRowCount}
            paginationModel={pendingPaginationModel}
            setPaginationModel={setPendingPaginationModel}
            isLoading={isLoadingPending}
            maxHeight={620}
          />
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, mt: 2 }}>
            Solicitações processadas:
          </Typography>
          <BaseTable
            rows={processedRequests}
            columns={processedRequestsColumns}
            checkBox={false}
            getRowId={(row) => row.equipment_request_id}
            rowCount={processedRowCount}
            paginationModel={processedPaginationModel}
            setPaginationModel={setProcessedPaginationModel}
            isLoading={isLoadingProcessed}
            maxHeight={620}
          />
        </>
      )}
    </Container>
  );
};

export default EquipmentRequests;
