import React ,{ useState,useEffect }from 'react';
import BaseTable from '../../components/shared/BaseTable';
import { StatusField,RequestEquipButtonCell } from '../../components/CustomColumns';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axiosClient from "../../axios-client";
import {CircularProgress, Container} from "@mui/material";
import Typography from '@mui/material/Typography';
import {useStateContext} from "../../context/GlobalContext";
import { useAuth } from "../../context/AuthProvider";


export default function EquipmentRequestPage() {

    const {sector} = useStateContext();
    const { user} = useAuth();
    const [equipments,setEquipments] = useState([]);
    const [isLoadingEquip, setIsLoadingEquip] = useState(true);
    const [rowCountEquip, setRowCountEquip] = useState(0);
    const [paginationModelEquip, setPaginationModelEquip] = useState({ page: 0, pageSize: 5 });

    
    useEffect(() => {
        const fetchEquipments = async () => {
            setIsLoadingEquip(true);
            try{
                const response = await axiosClient.get(`/equipments?page=${paginationModelEquip.page+1}&sector=${sector}`);
                const equipmentsWithId = response.data.data.map(equipment => ({
                    ...equipment, id: equipment?.equipment_id
                }));
                setEquipments(equipmentsWithId);
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


    const columnsEquip = [
        { field: 'id', headerName: 'Codigo', width: 80 },
        { field: 'name', headerName: 'Nome', flex:1,sortable: false,},
        { field: 'brand', headerName: 'Marca', flex:1,sortable: false,},
        { field: 'type', headerName: 'Tipo', flex:1,sortable: false,},
        { field: 'is_at_office', headerName: 'Local', flex:1,sortable: false,
            renderCell: (params) => (params.value ? params.row.sector : 'Fora do escritório'),
        },
        { 
            field: 'requestButton',
            headerName: 'Solicitar retirada',
            flex:1,
            renderCell: (params) => (
                <RequestEquipButtonCell onClick={(event) => handleButtonClick(event, params.row)} />
            ),
            sortable: false,
            align: 'center',
        },
    ];

    
    const [history,setHistory] = useState([]);
    const [isLoadingHist, setIsLoadingHist] = useState(true);
    const [rowCountHist, setRowCountHist] = useState(0);
    const [paginationModelHist, setPaginationModelHist] = useState({ page: 0, pageSize: 5 });

    
    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoadingHist(true);
            try{
                const response = await axiosClient.get(`/equipment-requests?page=${paginationModelEquip.page+1}`);
                const historyWithId = response.data.data.map(history => ({
                    ...history, id: history?.equipment_request_id
                }));
                setHistory(historyWithId);
                console.log(historyWithId);
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

    
    const columnsHist = [
        { field: 'id', headerName: 'Codigo', flex:1,},
        { field: 'name', headerName: 'Nome', flex:1,sortable: false,},
        { field: 'reason', headerName: 'Motivo', flex:1,sortable: false,},
        { 
            field: 'status',
            headerName: 'Status', 
            flex:1, 
            renderCell: (params) => <StatusField value={params.value} />, 
            sortable: false, 
            selectable: false, 
        },
    
    ];

    
    const rowsHist = history.map((row) => {
        return {
            id: row.equipment_request_id,
            name: row.equipment_id,
            reason: row.reason,
            status: row.request_status_id,
        };
    });  
    
    const [formData, setFormData] = useState({ reason: '',rowData: {}});
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleButtonClick = (event,row) => {
        setAnchorEl(event.currentTarget);
        setFormData({ reason: '', rowData: row}); 
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRequestSubmit = async () => {

        const payload = {
            reason: formData.reason,
            equipment_id: formData.rowData.equipment_id,
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

    //console.log(`user ${user?.user_id}`);

    return(<>
            <Container sx={{mt: 5}}>
                <Typography component="h1" variant="h4">
                    Equipamentos disponiveis
                </Typography>
                {equipments.length > 0 ? <BaseTable rows={equipments} columns={columnsEquip} checkBox={false}
                                                    rowCount={rowCountEquip} paginationModel={paginationModelEquip}
                                                    setPaginationModel={setPaginationModelEquip}
                                                    isLoading={isLoadingEquip}/> : <Grid item container justifyContent="center">
                <CircularProgress/>
                </Grid>}
            </Container>
            <Container sx={{mt: 10}}>
                <Typography component="h1" variant="h4">
                    Historico de solicitações
                </Typography>
                {isLoadingHist ? (
                    <Grid item container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                <>
                {rowCountHist > 0 ? (
                    <BaseTable
                    rows={rowsHist}
                    columns={columnsHist}
                    checkBox={false}
                    rowCount={rowCountHist}
                    paginationModel={paginationModelHist}
                    setPaginationModel={setPaginationModelHist}
                    isLoading={isLoadingHist}
                    />
                ) : (
                    <Typography variant="body1" color="textSecondary">
                    Nenhum dado encontrado.
                    </Typography>
                )}
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
                        <TextField
                            label="Motivo da retirada"
                            fullWidth
                            multiline
                            rows={2} 
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
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
                    background-color: rgba(0, 0, 0, 0.5); /* Cor escura semitransparente */
                    z-index: 999; /* Certifique-se de que a camada de fundo esteja acima de outros elementos */
                }
                `}
            </style>
        
    </>);

};
