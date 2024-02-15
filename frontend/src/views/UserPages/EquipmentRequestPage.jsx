import React ,{ useState,useEffect }from 'react';
import BaseTable from '../../components/shared/BaseTable';
import { StatusField,RequestEquipButtonCell } from '../../components/CustomColumns';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axiosClient from "../../axios-client";
import {CircularProgress, Container, MenuItem, Select} from "@mui/material";
import Typography from '@mui/material/Typography';
import {useStateContext} from "../../context/GlobalContext";
import { useAuth } from "../../context/AuthProvider";
import {EquipmentRequestHistoryTableColumns, EquipmentRequesEquipTableColumns} from "../../components/columns/EquipmentRequestTablesColumns";

export default function EquipmentRequestPage() {

    const {sector} = useStateContext();
    const { user} = useAuth();

    const [equipments,setEquipments] = useState([]);
    const [requestMotives,setRequestMotives] = useState([]);
    const [isLoadingEquip, setIsLoadingEquip] = useState(true);
    const [rowCountEquip, setRowCountEquip] = useState(0);
    const [paginationModelEquip, setPaginationModelEquip] = useState({ page: 0, pageSize: 5 });

    const [history,setHistory] = useState([]);
    const [isLoadingHist, setIsLoadingHist] = useState(true);
    const [rowCountHist, setRowCountHist] = useState(0);
    const [paginationModelHist, setPaginationModelHist] = useState({ page: 0, pageSize: 5 });
    
    useEffect(() => {
        const fetchEquipments = async () => {
            setIsLoadingEquip(true);
            try{
                const response = await axiosClient.get(`/equipments-available?page=${paginationModelEquip.page+1}&sector=${sector}`);
                setEquipments(response.data.data);
                setRowCountEquip((prevRowCountState) => response.data.meta.total !== undefined ? response.data.meta.total : prevRowCountState);
            
            }catch(error){
                console.error(error);
            }finally{
                setIsLoadingEquip(false);
            }

        };
        fetchEquipments().then(r => {
        });

    },[paginationModelEquip.page]);

  
    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoadingHist(true);
            try{
                const response = await axiosClient.get(`/equipment-requests?page=${paginationModelEquip.page+1}`);
                setHistory(response.data.data);
                setRowCountHist((prevRowCountState) => response.data.meta.total !== undefined ? response.data.meta.total : prevRowCountState);
            
            }catch(error){
                console.error(error);
            }finally{
                setIsLoadingHist(false);
            }

        };
        fetchHistory().then(r => {
        });

    },[paginationModelHist.page]);

    useEffect(() => {
        const fetchMotives = async () => {
            try{
                const response = await axiosClient.get(`/request-motives`);
                setRequestMotives(response.data.data);
            
            }catch(error){
                console.error(error);
            }
        };
        fetchMotives().then(r => {
        });

    },[]);
    

    const [formData, setFormData] = useState({ observation: '',motive:'',rowData: {}});
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleButtonClick = (event,row) => {
        setAnchorEl(event.currentTarget);
        setFormData({ observation: '',motive:'', rowData: row}); 
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRequestSubmit = async () => {

        const payload = {
            observation: formData.observation,
            equipment_id: formData.rowData.equipment_id,
            request_motive_id: formData.motive,
            user_id: user?.user_id,
        };
        try {
            const response = await axiosClient.post("/equipment-requests", payload);
            window.location.reload();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const columnsEquip = EquipmentRequesEquipTableColumns({handleButtonClick});
    const columnsHist = EquipmentRequestHistoryTableColumns();

    return(<>
            <Container sx={{mt: 5}}>
                <Typography component="h1" variant="h4">
                    Equipamentos disponiveis
                </Typography>
                {equipments.length > 0 ? <BaseTable rows={equipments} columns={columnsEquip} checkBox={false}
                                                    rowCount={rowCountEquip} paginationModel={paginationModelEquip}
                                                    getRowId={(row) => row.equipment_id}
                                                    setPaginationModel={setPaginationModelEquip}
                                                    isLoading={isLoadingEquip}/> : <Grid item container justifyContent="center">
                <CircularProgress/>
                </Grid>}
            </Container>
            <Container sx={{mt: 10}}>
                <Typography component="h1" variant="h4">
                    Historico de solicitações
                </Typography>
                {history.length > 0 ? <BaseTable rows={history} columns={columnsHist} checkBox={false}
                                                    rowCount={rowCountHist} paginationModel={paginationModelHist}
                                                    getRowId={(row) => row.equipment_request_id}
                                                    setPaginationModel={setPaginationModelHist}
                                                    isLoading={isLoadingHist}/> : <Grid item container justifyContent="center">
                <CircularProgress/>
                </Grid>}
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
            <Box p={2}>
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
                        <Select
                            label="Motivo"
                            fullWidth
                            value={formData.motive}
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
                        <TextField
                            label="Observação"
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
