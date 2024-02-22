import React ,{ useState,useEffect }from 'react';
import BaseTable from '../../components/shared/BaseTable';
import {Box,Grid,CircularProgress,Container} from '@mui/material';
import {useStateContext} from "../../context/GlobalContext";
import { useAuth } from "../../context/AuthProvider";
import {EquipmentRequestHistoryTableColumns, EquipmentRequestEquipTableColumns} from "../../components/columns/UserEquipmentRequestTablesColumns";
import { indexEquipmentsAvailability } from "../../services/equipmentService";
import { createEquipmentRequests, getRequestMotives,indexEquipmentRequests} from "../../services/equipmentRequestService";
import { errorToast } from "../../services/api";
import { toast } from "react-toastify";
import { CustomTabPanel, TableTab } from '../../components/shared/TableTab';
import EquipmentRequestPopOver from '../../components/EquipmentRequestPopOver';

export default function EquipmentRequestPage() {
    const {sector} = useStateContext();
    const { user} = useAuth();

    const [reload, setReload] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);

    const [equipments,setEquipments] = useState([]);
    const [isLoadingEquip, setIsLoadingEquip] = useState(true);
    const [rowCountEquip, setRowCountEquip] = useState(0);
    const [paginationModelEquip, setPaginationModelEquip] = useState({ page: 0, pageSize: 10 });

    const [history,setHistory] = useState([]);
    const [isLoadingHist, setIsLoadingHist] = useState(true);
    const [rowCountHist, setRowCountHist] = useState(0);
    const [paginationModelHist, setPaginationModelHist] = useState({ page: 0, pageSize: 10 });

    const [requestMotives,setRequestMotives] = useState([]);

    const [formData, setFormData] = useState({ observation: '',motive:'',rowData: {}});
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        fetchEquipments();
    },[paginationModelEquip.page,reload, sector]);

    useEffect(() => {
        fetchHistory();
    },[paginationModelHist.page, reload]);

    useEffect(() => {
        fetchMotives();
    },[]);

    const fetchEquipments = async () => {
        setIsLoadingEquip(true);
        try{
            const page = paginationModelEquip.page + 1;
            await indexEquipmentsAvailability({ 
                page:page, 
                sector:sector,
                availability:true,
            })
            .then((res)=>{
                setEquipments(res.data);
                setRowCountEquip((prevRowCountState) => res.meta.total ?? prevRowCountState,);
            });
        }catch(error){
            errorToast(error);
            console.error(error);
        }finally{
            setIsLoadingEquip(false);
            setFirstLoading(false);
        }
    };

    const fetchHistory = async () => {
        setIsLoadingHist(true);
        try{
            const page = paginationModelHist.page + 1;
            await indexEquipmentRequests({
                page: page,
            })
            .then((res)=>{
                setHistory(res.data);
                setRowCountHist((prevRowCountState) => res.meta.total ?? prevRowCountState,);
            });
        }catch(error){
            errorToast(error);
            console.error(error);
        }finally{
            setIsLoadingHist(false);
            setFirstLoading(false);
        }
    };

    const fetchMotives = async () => {
        try{
            await getRequestMotives()
            .then((res)=>{
                setRequestMotives(res.data);
            });
        }catch(error){
            errorToast(error);
            console.error(error);
        }
    };

    const handleRequestEquipButtonClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setFormData({
          observation: '',
          motive: '',
          rowData: row,
        });
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleRequestSubmit = async () => {
        if(!formData.motive){
            toast.error(`Selecione um motivo`);
            return;
        }
        const payload = {
            observation: formData.observation,
            equipment_id: formData.rowData.equipment_id,
            request_motive_id: formData.motive,
            user_id: user?.user_id,
        };
        try {
            await createEquipmentRequests({ formData: payload })
            .then((res)=>{
                toast.success(`Equipamento solicitado com sucesso`);
                setReload((prev) => !prev);
            });
        } catch (error) {
            console.error(error);
        }
        handlePopoverClose();
    };

    const columnsEquip = EquipmentRequestEquipTableColumns({handleRequestEquipButtonClick});
    const columnsHist = EquipmentRequestHistoryTableColumns();


    return(<>
        <Container sx={{mt: 5}}>
            {firstLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
                ) : (
                <>
                    <Box sx={{ width: '100%' }}>
                        <TableTab value={tabValue} setValue={setTabValue} nameTabs={["Equipamentos Disponiveis","Historico de solicitações"]}/>
                        <CustomTabPanel value={tabValue} index={0}>
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
                </>
            )}
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
