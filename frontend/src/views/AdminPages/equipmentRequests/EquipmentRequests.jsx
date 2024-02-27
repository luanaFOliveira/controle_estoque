import React, {useEffect, useState} from "react";
import {indexEquipmentRequests,getRequestMotives} from "../../../services/equipmentRequestService";
import {Box, CircularProgress, Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import BaseTable from "../../../components/shared/BaseTable";
import AdminEquipmentRequestTableColumns from "../../../components/columns/AdminEquipmentRequestTableColumns";
import {CustomTabPanel, TableTab} from "../../../components/shared/TableTab";
import FilterBox from '../../../components/shared/FilterBox';

const EquipmentRequests = () => {
    const [firstLoading, setIFirstLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    const [pendingRequests, setPendingRequests] = useState([]);
    const [isLoadingPending, setIsLoadingPending] = useState(true);
    const [pendingRowCount, setPendingRowCount] = useState(0);
    const [pendingPaginationModel, setPendingPaginationModel] = useState({
        page: 0, pageSize: 10,
    });

    const [processedRequests, setProcessedRequests] = useState([]);
    const [isLoadingProcessed, setIsLoadingProcessed] = useState(true);
    const [processedRowCount, setProcessedRowCount] = useState(0);
    const [processedPaginationModel, setProcessedPaginationModel] = useState({
        page: 0, pageSize: 10,
    });

    const pendingRequestsColumns = AdminEquipmentRequestTableColumns({
        is_handled_table: true, setReload: setReload,
    });
    const processedRequestsColumns = AdminEquipmentRequestTableColumns({
        is_handled_table: false,
    });

    const [filter, setFilter] = useState({
        searchPending: "none", searchProcessed: "none", status: "Nao pendente", motivePending: "all", motiveProcessed: "all",
    });

    const [requestMotives, setRequestMotives] = useState([]);

    useEffect(() => {
        fetchMotives();
    }, []);

    useEffect(() => {
        getPendingRequests();
    }, [pendingPaginationModel.page, reload, filter]);

    useEffect(() => {
        getProcessedRequests();
    }, [processedPaginationModel.page, reload, filter]);

    const getPendingRequests = async () => {
        setIsLoadingPending(true);
        const page = pendingPaginationModel.page + 1;
        const res = await indexEquipmentRequests({
            filter: {status: "Pendente", search: filter.searchPending, request_motive: filter.motivePending}, page: page,
        }).finally(() => {
            setIsLoadingPending(false);
            setIFirstLoading(false);
        })
        if (res) {
            setPendingRequests(res.data);
            setPendingRowCount((prevRowCountState) => res.meta.total ?? prevRowCountState,);
        }
    };

    const getProcessedRequests = async () => {
        setIsLoadingProcessed(true);
        const page = processedPaginationModel.page + 1;
        const res = await indexEquipmentRequests({
            filter: {status: filter.status, search: filter.searchProcessed, request_motive: filter.motiveProcessed}, page: page,
        }).finally(() => {
            setIsLoadingProcessed(false);
            setIFirstLoading(false);
        })
        if (res) {
            setProcessedRequests(res.data);
            setProcessedRowCount((prevRowCountState) => res.meta.total ?? prevRowCountState);
        }
    };

    const fetchMotives = async () => {
        const res = await getRequestMotives();
        if (res) {
            const motivesNames = res.data.map((motive) => motive.name);
            setRequestMotives(motivesNames);
        }
    };

    const handleSearchPending = (searchPending) => {
        setFilter((prevFilter) => ({...prevFilter, searchPending}));
    };

    const handleSearchProcessed = (searchProcessed) => {
        setFilter((prevFilter) => ({...prevFilter, searchProcessed}));
    };

    const handleMotivePendingChange = (motivePending) => {
        setFilter((prevFilter) => ({...prevFilter, motivePending}));
    };

    const handleMotiveProcessedChange = (motiveProcessed) => {
        setFilter((prevFilter) => ({...prevFilter, motiveProcessed}));
    };

    const handleAvailabilityChange = (status) => {
        let newStatus = "Nao pendente";
        if (status === "all") {
            newStatus = "Nao pendente";
        } else {
            newStatus = status ? "Aprovado" : "Não Aprovado";
        }
        setFilter((prevFilter) => ({...prevFilter, status: newStatus}));
    };

    return (<Container sx={{mt: 5, pr:0.5}}>
        {firstLoading ? (<Grid item container justifyContent="center">
            <CircularProgress/>
        </Grid>) : (<Box sx={{width: '100%'}} >
            <TableTab value={tabValue} setValue={setTabValue}
                      nameTabs={["Solicitações pendentes", "Solicitações processadas"]}/>
            <CustomTabPanel value={tabValue} index={0}>
                <FilterBox onSearch={handleSearchPending} disponibility={false} equipmentBrand={false} equipmentType={false} requestMotive={true} onMotiveChange={handleMotivePendingChange} motiveLabels={requestMotives}
                           label='Pesquisar Código do equipamento ou nome do usuario'/>
                <BaseTable
                    rows={pendingRequests}
                    columns={pendingRequestsColumns}
                    getRowId={(row) => row.equipment_request_id}
                    rowCount={pendingRowCount}
                    paginationModel={pendingPaginationModel}
                    setPaginationModel={setPendingPaginationModel}
                    isLoading={isLoadingPending}
                />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <FilterBox onSearch={handleSearchProcessed} onAvailabilityChange={handleAvailabilityChange}
                           disponibility={true} equipmentBrand={false} equipmentType={false} requestMotive={true} onMotiveChange={handleMotiveProcessedChange} motiveLabels={requestMotives}
                           label='Pesquisar Código do equipamento ou nome do usuario'
                           disponibilityLabels={["Não Aprovado","Aprovado"]}/>
                <BaseTable
                    rows={processedRequests}
                    columns={processedRequestsColumns}
                    getRowId={(row) => row.equipment_request_id}
                    rowCount={processedRowCount}
                    paginationModel={processedPaginationModel}
                    setPaginationModel={setProcessedPaginationModel}
                    isLoading={isLoadingProcessed}
                />
            </CustomTabPanel>
        </Box>)}
    </Container>);
};

export default EquipmentRequests;
