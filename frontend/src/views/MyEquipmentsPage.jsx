import React ,{ useState,useEffect }from 'react';
import BaseTable from '../components/shared/BaseTable';
import Grid from '@mui/material/Grid';
import axiosClient from "../axios-client";
import {CircularProgress, Container} from "@mui/material";
import Typography from '@mui/material/Typography';
import { useAuth } from "../context/AuthProvider";

export default function MyEquipmentsPage() {
    const { user} = useAuth();

    const [equipAvailable, setEquipAvailable] = useState([{}]);
    const [equipUnavailable, setEquipUnavailable] = useState([]);

    const [isLoadingEquipAva, setIsLoadingEquipAva] = useState(true);
    const [isLoadingEquipUna, setIsLoadingEquipUna] = useState(true);
    
    const [rowCountEquipAva, setRowCountEquipAva] = useState(0);
    const [rowCountEquipUna, setRowCountEquipUna] = useState(0);

    const [paginationModelEquipAva, setPaginationModelEquipAva] = useState({ page: 0, pageSize: 5 });
    const [paginationModelEquipUna, setPaginationModelEquipUna] = useState({ page: 0, pageSize: 5 });


    useEffect(() => {
        const fetchEquipmentsAvailable = async () => {
            setIsLoadingEquipAva(true);
            try{
                const response = await axiosClient.get(`/history/users?user_id=${user.user_id}&availability=available`);
                const equipmentsWithId = response.data.data.map(equipment => ({
                    ...equipment, id: equipment?.user_equipment_id
                }));   
                setEquipAvailable(equipmentsWithId);
                setRowCountEquipAva((prevRowCountState) => response.data.meta.total !== undefined ? response.data.meta.total : prevRowCountState);
            
            }catch(error){
                console.error(error);
            }finally{
                setIsLoadingEquipAva(false);
            }

        };
        fetchEquipmentsAvailable().then(r => {
        });

    },[paginationModelEquipAva.page]);

    
    const columnsEquipAvailable = [
        { field: 'id', headerName: 'Codigo', width: 80 },
        { field: 'name', headerName: 'Nome', flex:1,sortable: false,},
        { field: 'brand', headerName: 'Marca', flex:1,sortable: false,},
        { field: 'type', headerName: 'Tipo', flex:1,sortable: false,},
        { field: 'is_at_office', headerName: 'Local', flex:1,sortable: false,
            renderCell: (params) => (params.value ? params.row.sector : 'Fora do escritório'),
        },
        
    ];

    useEffect(() => {
        const fetchEquipmentsUnavailable = async () => {
            setIsLoadingEquipUna(true);
            try{
                const response = await axiosClient.get(`/history/users?user_id=${user.user_id}&availability=unavailable`);
                const equipmentsWithId = response.data.data.map(equipment => ({
                    ...equipment, id: equipment?.user_equipment_id
                }));   
                setEquipUnavailable(equipmentsWithId);
                setRowCountEquipUna((prevRowCountState) => response.data.meta.total !== undefined ? response.data.meta.total : prevRowCountState);
            
            }catch(error){
                console.error(error);
            }finally{
                setIsLoadingEquipUna(false);
            }

        };
        fetchEquipmentsUnavailable().then(r => {
        });

    },[paginationModelEquipUna.page]);

    const columnsEquipUnavailable = [
        { field: 'id', headerName: 'Codigo', flex:1,},
        { field: 'name', headerName: 'Nome', flex:1,sortable: false,},
        { field: 'brand', headerName: 'Marca', flex:1,sortable: false,},
        { field: 'type', headerName: 'Tipo', flex:1,sortable: false,},
        { field: 'is_at_office', headerName: 'Local', flex:1,sortable: false,
            renderCell: (params) => (params.value ? params.row.sector : 'Fora do escritório'),
        },
        { field: 'created_at', headerName: 'Data de retirada', flex:1,},
        { field: 'returned_at', headerName: 'Data de devolucao', flex:1,},
    ];


    var rowsEquipAvailable = [];
    
    if (equipAvailable.length > 0) {
        rowsEquipAvailable = equipAvailable.map((row) => {
            const { user, equipment } = row;
            if (equipment && equipment.length > 0) {
                const { name, equipment_brand, equipment_type, is_at_office } = equipment[0];
                
                return {
                    id: user.user_id,
                    name: name,
                    brand: equipment_brand,
                    type: equipment_type,
                    is_at_office: is_at_office,
                };
            } else {
                return {};
            }
        });  
    }
    

    var rowsEquipUnavailable = [];

    if (equipUnavailable.length > 0) {
        rowsEquipUnavailable = equipUnavailable.map((row) => {
            const { user, equipment,created_at,returned_at } = row;
            if (equipment && equipment.length > 0) {
                const { name, equipment_brand, equipment_type, is_at_office } = equipment[0];
                
                return {
                    id: user.user_id,
                    name: name,
                    brand: equipment_brand,
                    type: equipment_type,
                    is_at_office: is_at_office,
                    created_at: created_at,
                    returned_at: returned_at,
                };
            } else {
                return {};
            }
        });  
    }

    return(<>
        <Container sx={{mt: 5}}>
            <Typography component="h1" variant="h4">
                Equipamentos ativos
            </Typography>
            {isLoadingEquipAva ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
            <>
            {rowCountEquipAva > 0 ? (
                <BaseTable
                rows={rowsEquipAvailable}
                columns={columnsEquipAvailable}
                checkBox={false}
                rowCount={rowCountEquipAva}
                paginationModel={paginationModelEquipAva}
                setPaginationModel={setPaginationModelEquipAva}
                isLoading={isLoadingEquipAva}
                />
            ) : (
                <Typography variant="body1" color="textSecondary">
                Nenhum dado encontrado.
                </Typography>
            )}
            </>
        )}
        </Container>
        <Container sx={{mt: 10}}>
            <Typography component="h1" variant="h4">
                Historico de equipamentos
            </Typography>
            {isLoadingEquipUna ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
            <>
            {rowCountEquipUna > 0 ? (
                <BaseTable
                rows={rowsEquipUnavailable}
                columns={columnsEquipUnavailable}
                checkBox={false}
                rowCount={rowCountEquipUna}
                paginationModel={paginationModelEquipUna}
                setPaginationModel={setPaginationModelEquipUna}
                isLoading={isLoadingEquipUna}
                />
            ) : (
                <Typography variant="body1" color="textSecondary">
                Nenhum dado encontrado.
                </Typography>
            )}
            </>
        )}
        </Container>
    
</>);

};
