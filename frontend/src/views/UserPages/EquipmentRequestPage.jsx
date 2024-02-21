import React ,{ useState,useEffect }from 'react';
import BaseTable from '../../components/shared/BaseTable';
import {Box,Popover,Button,TextField,Grid,InputLabel,Select,CircularProgress,Container,MenuItem} from '@mui/material';
import {useStateContext} from "../../context/GlobalContext";
import { useAuth } from "../../context/AuthProvider";
import {EquipmentRequestHistoryTableColumns, EquipmentRequestEquipTableColumns} from "../../components/columns/UserEquipmentRequestTablesColumns";
import { indexEquipmentsAvailability } from "../../services/equipmentService";
import { createEquipmentRequests, getRequestMotives,indexEquipmentRequests} from "../../services/equipmentRequestService";
import { errorToast } from "../../services/api";
import { toast } from "react-toastify";
import { CustomTabPanel, TableTab } from '../../components/shared/TableTab';

export default function EquipmentRequestPage() {

    const {sector} = useStateContext();
    const { user} = useAuth();

    const [reload, setReload] = useState(false);
    const [firstLoading, setFirstLoading] = useState(true);

    const [equipments,setEquipments] = useState([]);
    const [requestMotives,setRequestMotives] = useState([]);
    const [isLoadingEquip, setIsLoadingEquip] = useState(true);
    const [rowCountEquip, setRowCountEquip] = useState(0);
    const [paginationModelEquip, setPaginationModelEquip] = useState({ page: 0, pageSize: 10 });

    const [history,setHistory] = useState([]);
    const [isLoadingHist, setIsLoadingHist] = useState(true);
    const [rowCountHist, setRowCountHist] = useState(0);
    const [paginationModelHist, setPaginationModelHist] = useState({ page: 0, pageSize: 10 });

    

    const [formData, setFormData] = useState({ observation: '',motive:'',rowData: {}});
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [tabValue, setTabValue] = React.useState(0);

    useEffect(() => {
        const fetchEquipments = async () => {
            setIsLoadingEquip(true);
            try{
                const page = paginationModelEquip.page + 1;
                const response = await indexEquipmentsAvailability({ 
                    page:page, 
                    sector:sector,
                    availability:true,
                });
                setEquipments(response.data);
                setRowCountEquip((prevRowCountState) => response.meta.total ?? prevRowCountState,);

            }catch(error){
                errorToast(error);
                console.error(error);
            }finally{
                setIsLoadingEquip(false);
                setFirstLoading(false);
            }

        };
        fetchEquipments().then(r => {
        });

    },[paginationModelEquip.page,reload]);


    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoadingHist(true);
            try{
                const page = paginationModelHist.page + 1;
                const response = await indexEquipmentRequests({
                    page: page,
                });
                setHistory(response.data);
                setRowCountHist((prevRowCountState) => response.meta.total ?? prevRowCountState,);

            }catch(error){
                errorToast(error);
                console.error(error);
            }finally{
                setIsLoadingHist(false);
                setFirstLoading(false);
            }

        };
        fetchHistory().then(r => {
        });

    },[paginationModelHist.page, reload]);

    useEffect(() => {
        const fetchMotives = async () => {
            try{
                const response = await getRequestMotives();
                setRequestMotives(response.data);

            }catch(error){
                errorToast(error);
                console.error(error);
            }
        };
        fetchMotives().then(r => {
        });

    },[]);


    const handleButtonClick = (event,row) => {
        setAnchorEl(event.currentTarget);
        setFormData({ observation: '',motive:'', rowData: row});
    };

    const handleClose = () => {
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
            const response = await createEquipmentRequests({ formData: payload });
            if(response){
                toast.success(`Equipamento solicitado com sucesso`);
                setReload((prev) => !prev);
            }
        } catch (error) {
            console.error(error);
        }
        handleClose();
    };

    const columnsEquip = EquipmentRequestEquipTableColumns({handleButtonClick});
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
                        <TableTab value={tabValue} setValue={setTabValue} nameTab1="Equipamentos Disponiveis" nameTab2="Historico de solicitações" />
                        <CustomTabPanel value={tabValue} index={0}>
                            <BaseTable
                                rows={equipments}
                                columns={columnsEquip}
                                rowCount={rowCountEquip}
                                paginationModel={paginationModelEquip}
                                getRowId={(row) => row.equipment_id}
                                setPaginationModel={setPaginationModelEquip}
                                isLoading={isLoadingEquip}
                                maxHeight={620}
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
                                maxHeight={620}
                            />
                        </CustomTabPanel>
                    </Box>
                    
                </>
            )}
        </Container>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
        <Box p={2} component="form">
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        label="Equipamento a ser retirado"
                        fullWidth
                        value={formData.rowData.name}
                        InputProps={{ readOnly: true }}
                        sx={{ marginBottom: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="motivo">Motivo*</InputLabel>
                    <Select
                        label="Motivo"
                        fullWidth
                        value={formData.motive}
                        required
                        sx={{ marginBottom: 2 }}
                        onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                    >
                        {requestMotives.map((motive) => (
                            <MenuItem key={motive.request_motive_id} value={motive.request_motive_id}>
                                {motive.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="observacao">Observação</InputLabel>
                    <TextField
                        label="Adicione uma observação (opcional)"
                        fullWidth
                        multiline
                        rows={2}
                        value={formData.observation}
                        onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={() => handleRequestSubmit()}>
                        Confirmar
                    </Button>
                </Grid>
            </Grid>
        </Box>
        </Popover>
        {open && <div className="backdrop" onClick={handleClose}></div>}
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
