import React ,{ useState,useEffect }from 'react';
import BaseTable from '../components/shared/BaseTable';
import { StatusField,RequestEquipButtonCell } from '../components/CustomColumns';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axiosClient from "../axios-client";


export default function EquipmentRequestPage() {

    const [equipments,setEquipments] = useState([]);
    const [currentPageEqui, setCurrentPageEqui] = useState(1);
    const [lastPageEqui, setLastPageEqui] = useState(1);

    useEffect(() => {
        getEquipments();
    }, [currentPageEqui]);

    const getEquipments = async(page) => {
        axiosClient.get("/equipments", {
            params: {
                page: page,
            },
        })
        .then(({ data }) => {
                setEquipments(data.data);
                setLastPageEqui(data.meta.last_page);
                setCurrentPageEqui(data.meta.current_page);
        })
        .catch(() => {
        });
    };


    const handlePageChangeEqui = (page) => {
        getEquipments(page);
    };

    const columnsEquip = [
        { field: 'id', headerName: 'Codigo', width: 100 },
        { field: 'name', headerName: 'Nome', width: 170,sortable: false,},
        { field: 'brand', headerName: 'Marca', width: 130,sortable: false,},
        { field: 'type', headerName: 'Tipo', width: 130,sortable: false,},
        { field: 'location', headerName: 'Local', width: 130,sortable: false,},
        { 
            field: 'requestButton',
            headerName: 'Solicitar retirada',
            width: 130,
            renderCell: (params) => (
                <RequestEquipButtonCell onClick={(event) => handleButtonClick(event, params.row)} />
            ),
            sortable: false,
            align: 'center',
        },
    ];

    const rowsEquip = equipments.map((equip) => {
        const office = equip.is_at_office ? 'Escritorio' : 'Home Office'; 
        return {
            id: equip.equipment_id,
            name: equip.name,
            brand: equip.brand,
            type: equip.type,
            location: office,
        };
    });

    
    const columnsHistory = [
        { field: 'id', headerName: 'Codigo', width: 100,},
        { field: 'name', headerName: 'Nome', width: 170,sortable: false,},
        { 
            field: 'status',
            headerName: 'Status', 
            width: 130, 
            renderCell: (params) => <StatusField value={params.value} />, 
            sortable: false, 
            selectable: false, 
            align: 'center', 
        },
    
    ];
      
    const rowsHistory = [
        { id: 1, name: 'Ideapad gaming 3i',status:'Aprovado' },
        { id: 2, name: 'Nitro 5' ,status:'Pendente'},
        { id: 3, name: 'Inspiron 15',status:'Aprovado' },
        { id: 4, name: 'Galaxy Book 2',status:'Reprovado' },
    ];

    const [formValues, setFormValues] = useState({ motive: '', rowData: {}});
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleButtonClick = (event,row) => {
        setAnchorEl(event.currentTarget);
        setFormValues({ motive: '', rowData: row}); 
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRequestSubmit = () => {
        console.log(formValues);
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return(<>
        <div style={{display:'flex',flexDirection:'column'} }>
            <div>
                <h1>Equipamentos Disponiveis</h1>
                <div style={{ height: 400, width: '100%'}}>
                    <BaseTable rows={rowsEquip} columns={columnsEquip} checkBox={false} pageSize={5} currentPage={currentPageEqui} handlePageChange={handlePageChangeEqui} lastPage={lastPageEqui}  />
                </div>
            </div>
            <div>
                <h1>Historico de solicitacao</h1>
                <div style={{ height: 350, width: '100%' }}>
                    <BaseTable rows={rowsHistory} columns={columnsHistory} checkBox={false} pageSize={5} pageSizeOption={[5,10,15]}  />
                </div>
            </div>
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
                            value={formValues.rowData.name}
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
                            value={formValues.motive}
                            onChange={(e) => setFormValues({ ...formValues, motive: e.target.value })}
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
        </div>
        
    </>);

};