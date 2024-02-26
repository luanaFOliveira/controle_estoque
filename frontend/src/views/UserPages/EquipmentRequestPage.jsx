import React, {useEffect, useState} from 'react';
import BaseTable from '../../components/shared/BaseTable';
import {Box, CircularProgress, Container, Grid} from '@mui/material';
import {useStateContext} from "../../context/GlobalContext";
import {useAuth} from "../../context/AuthProvider";
import {
    EquipmentRequestEquipTableColumns,
    EquipmentRequestHistoryTableColumns
} from "../../components/columns/UserEquipmentRequestTablesColumns";
import {indexEquipmentsAvailability} from "../../services/equipmentService";
import {
    createEquipmentRequests,
    getRequestMotives,
    indexEquipmentRequests
} from "../../services/equipmentRequestService";
import {toast} from "react-toastify";
import {CustomTabPanel, TableTab} from '../../components/shared/TableTab';
import EquipmentRequestPopOver from '../../components/EquipmentRequestPopOver';
import FilterBox from '../../components/shared/FilterBox';
import {getEquipmentDetails} from "../../services/equipmentService";


export default function EquipmentRequestPage() {
    const {sector} = useStateContext();
    const {user} = useAuth();

    const [reload, setReload] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);

    const [equipments, setEquipments] = useState([]);
    const [isLoadingEquip, setIsLoadingEquip] = useState(true);
    const [rowCountEquip, setRowCountEquip] = useState(0);
    const [paginationModelEquip, setPaginationModelEquip] = useState({page: 0, pageSize: 10});

    const [history, setHistory] = useState([]);
    const [isLoadingHist, setIsLoadingHist] = useState(true);
    const [rowCountHist, setRowCountHist] = useState(0);
    const [paginationModelHist, setPaginationModelHist] = useState({page: 0, pageSize: 10});

    const [requestMotives, setRequestMotives] = useState([]);

    const [formData, setFormData] = useState({observation: '', motive: '', rowData: {}});
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [tabValue, setTabValue] = useState(0);

    const [filter, setFilter] = useState({
        search: "none", equipmentBrand: "all",equipmentType: "all", status: "Nao pendente", requestMotive: "all", searchHistory: "none"
    });

    const [equipmentsBrands, setEquipmentsBrands] = useState([]);
    const [equipmentsTypes, setEquipmentsTypes] = useState([]);
    const [motivesNames, setMotivesNames] = useState([]);

    useEffect(() => {
        fetchEquipments();
    }, [paginationModelEquip.page, reload, sector, filter]);

    useEffect(() => {
        fetchHistory();
    }, [paginationModelHist.page, reload,filter]);

    useEffect(() => {
        fetchMotives();
    }, []);

    useEffect(() => {
        fetchEquipmentsDetails();
    }, []);

    const fetchEquipments = async () => {
        setIsLoadingEquip(true);
        const page = paginationModelEquip.page + 1;
        if (sector) {
            const res = await indexEquipmentsAvailability({
                page: page, sector: sector, availability: true, search: filter.search, brand: filter.equipmentBrand, type: filter.equipmentType
            }).finally(() => {
                setIsLoadingEquip(false);
                setFirstLoading(false);
            })
            if (res) {
                setEquipments(res.data);
                setRowCountEquip((prevRowCountState) => res.meta.total ?? prevRowCountState);
            }
        }
    };

    const fetchHistory = async () => {
        setIsLoadingHist(true);
        const page = paginationModelHist.page + 1;
        const res = await indexEquipmentRequests({
            filter: {status: filter.status, search: filter.searchHistory, request_motive: filter.requestMotive}, page: page,
        }).finally(() => {
            setIsLoadingHist(false);
            setFirstLoading(false);
        })
        if (res) {
            setHistory(res.data);
            setRowCountHist((prevRowCountState) => res.meta.total ?? prevRowCountState);
        }
    };

    const fetchMotives = async () => {
        const res = await getRequestMotives();
        if (res) {
            setRequestMotives(res.data);
            const names = res.data.map((motive) => motive.name);
            setMotivesNames(names);
        }
    };

    const fetchEquipmentsDetails = async () => {
        const res = await getEquipmentDetails();
        if (res) {
            setEquipmentsBrands(res.equipment_brands);
            setEquipmentsTypes(res.equipment_types);
        }
    };

    const handleRequestEquipButtonClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setFormData({
            observation: '', motive: '', rowData: row,
        });
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleRequestSubmit = async () => {
        if (!formData.motive) {
            toast.error(`Selecione um motivo`);
            return;
        }
        const payload = {
            observation: formData.observation,
            equipment_id: formData.rowData.equipment_id,
            request_motive_id: formData.motive,
            user_id: user?.user_id,
        };
        const res = await createEquipmentRequests({formData: payload});
        if (res) {
            toast.success(`Equipamento solicitado com sucesso`);
            setReload((prev) => !prev);
        }
        handlePopoverClose();
    };

    const handleSearch = (search) => {
        setFilter((prevFilter) => ({...prevFilter, search}));
    };

    const handleBrandChange = (equipmentBrand) => {
        setFilter((prevFilter) => ({...prevFilter, equipmentBrand}));
    };

    const handleTypeChange = (equipmentType) => {
        setFilter((prevFilter) => ({...prevFilter, equipmentType}));
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

    const handleRequestMotiveChange = (requestMotive) => {
        setFilter((prevFilter) => ({...prevFilter, requestMotive}));
    };

    const handleSearchHistory = (searchHistory) => {
        setFilter((prevFilter) => ({...prevFilter, searchHistory}));
    };

    const columnsEquip = EquipmentRequestEquipTableColumns({handleRequestEquipButtonClick});
    const columnsHist = EquipmentRequestHistoryTableColumns();


    return (<>
        <Container sx={{mt: 5}}>
            {firstLoading ? (<Grid item container justifyContent="center">
                <CircularProgress/>
            </Grid>) : (<>
                <Box sx={{width: '100%'}}>
                    <TableTab value={tabValue} setValue={setTabValue}
                              nameTabs={["Equipamentos Disponiveis", "Historico de solicitações"]}/>
                    <CustomTabPanel value={tabValue} index={0}>
                        <FilterBox onSearch={handleSearch} disponibility={false} equipmentBrand={true} onBrandChange={handleBrandChange} brandLabels={equipmentsBrands} equipmentType={true} onTypeChange={handleTypeChange} typeLabels={equipmentsTypes}
                                   label='Pesquisar Código do equipamento ou nome do equipamento'
                                   disponibilityLabels={["Não Aprovado","Aprovado"]}/>
                        <BaseTable
                            rows={equipments}
                            columns={columnsEquip}
                            rowCount={rowCountEquip}
                            paginationModel={paginationModelEquip}
                            getRowId={(row) => row.equipment_id}
                            setPaginationModel={setPaginationModelEquip}
                            isLoading={isLoadingEquip}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <FilterBox onSearch={handleSearchHistory} disponibility={true} onAvailabilityChange={handleAvailabilityChange} equipmentBrand={false} equipmentType={false} requestMotive={true} onMotiveChange={handleRequestMotiveChange} motiveLabels={motivesNames}
                                   label='Pesquisar Código do equipamento ou nome do equipamento'
                                   disponibilityLabels={["Não Aprovado","Aprovado"]}/>
                        <BaseTable
                            rows={history}
                            columns={columnsHist}
                            rowCount={rowCountHist}
                            paginationModel={paginationModelHist}
                            getRowId={(row) => row.equipment_request_id}
                            setPaginationModel={setPaginationModelHist}
                            isLoading={isLoadingHist}
                        />
                    </CustomTabPanel>
                </Box>
            </>)}
        </Container>
        <EquipmentRequestPopOver
            anchorEl={anchorEl}
            open={open}
            handlePopoverClose={handlePopoverClose}
            id={id}
            requestMotives={requestMotives}
            formData={formData}
            setFormData={setFormData}
            handleRequestSubmit={handleRequestSubmit}
        />
        {open && <div className="backdrop" onClick={handlePopoverClose}></div>}
        <style>
            {`
            .backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5); 
                z-index: 999; 
            }
            `}
        </style>
    </>);
};
