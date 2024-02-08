import React ,{ useState,useEffect }from 'react';
import BaseTable from '../components/shared/BaseTable';
import { AvaiabilityColumn } from '../components/CustomColumns';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axiosClient from "../axios-client";
import {CircularProgress, Container} from "@mui/material";
import Typography from '@mui/material/Typography';
import {useStateContext} from "../context/GlobalContext";


//falta ver a paginacao pra ela funcionar 100%, por enquanto ta com o mesmo modelo para as duas tabelas, e se nao me engano as info nao vem paginadas

export default function SectorPage() {

    const {sector,user} = useStateContext();
    const [sectorInfo,setSectorInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [sectorUsers,setSectorUsers] = useState([]);
    const [sectorEquipments,setSectorEquipments] = useState([]);

    
    useEffect(() => {
        const fetchSector = async () => {
            setIsLoading(true);
            try{
                const response = await axiosClient.get(`/sectors/${sector}`);
                setSectorInfo(response.data.data);
                const usersWithId = response.data.data.users ? response.data.data.users.map(user => ({
                    ...user, id: user?.user_id
                })) : [];
                setSectorUsers(usersWithId);

                const equipmentsWithId = response.data.data.equipments ? response.data.data.equipments.map(equipment => ({
                    ...equipment, id: equipment?.equipment_id
                })) : [];
                setSectorEquipments(equipmentsWithId);
            
            }catch(error){
                console.error(error);
            }finally{
                setIsLoading(false);
            }

        };
        fetchSector().then(r => {
        });

    },[paginationModel.page]);

    

    const columnsUsers = [
        { field: 'id', headerName: 'Codigo', width: 80 },
        { field: 'name', headerName: 'Nome', flex:1,sortable: false,},
        { field: 'email', headerName: 'Email', flex:1,sortable: false,},
    ];

    const columnsEquipments = [
        { field: 'id', headerName: 'Codigo', width: 80 },
        { field: 'name', headerName: 'Nome', flex:1,sortable: false,},
        { field: 'equipment_brand', headerName: 'Marca', flex:1,sortable: false,},
        { field: 'equipment_type', headerName: 'Tipo', flex:1,sortable: false,},
        { field: 'is_at_office', headerName: 'Local', flex:1,sortable: false,
            renderCell: (params) => (params.value ? params.row.sector : 'Fora do escritório'),
        },
        { 
            field: 'is_available',
            headerName: 'Disponibilidade', 
            flex:1, 
            renderCell: (params) => (params.row ? <AvaiabilityColumn value= "Disponivel"/> : <AvaiabilityColumn value= "Nao disponivel"/>), 
            sortable: false, 
            selectable: false, 
            align: 'center', 
        },
    ];

    

    const rowCountUsers = sectorUsers ? sectorUsers.length : 0;
    const rowCountEquipments = sectorEquipments ? sectorEquipments.length : 0;


    return(<>
        <Container sx={{mt: 5}}>
            <Typography component="h1" variant="h4">
                Pessoas
            </Typography>
            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
            <>
            {rowCountUsers > 0 ? (
                <BaseTable
                rows={sectorUsers}
                columns={columnsUsers}
                checkBox={false}
                rowCount={rowCountUsers}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                isLoading={isLoading}
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
                Equipamentos
            </Typography>
            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
            <>
            {rowCountEquipments > 0 ? (
                <BaseTable
                rows={sectorEquipments}
                columns={columnsEquipments}
                checkBox={false}
                rowCount={rowCountEquipments}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                isLoading={isLoading}
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