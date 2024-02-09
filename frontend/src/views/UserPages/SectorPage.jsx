import React ,{ useState,useEffect }from 'react';
import BaseTable from '../../components/shared/BaseTable';
import { AvaiabilityColumn } from '../../components/CustomColumns';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axiosClient from "../../axios-client";
import {CircularProgress, Container} from "@mui/material";
import Typography from '@mui/material/Typography';
import {useStateContext} from "../../context/GlobalContext";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

//falta ver a paginacao pra ela funcionar 100%, por enquanto ta com o mesmo modelo para as duas tabelas, e se nao me engano as info nao vem paginadas

export default function SectorPage() {

    const {sector,user} = useStateContext();
    const [sectorInfo,setSectorInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    }, []);

    

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
            field: "is_available",
            headerName: "Disponível",
            flex: 1,
            renderCell: (params) => (params.value ? <CheckIcon /> : <CloseIcon />),
        },
    ];

    

    
    return(<>
        <Container sx={{mt: 5}}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                {sectorInfo.name}
            </Typography>
            <Grid container spacing={2} mb={6}>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                    Usuários do Setor
                    </Typography>
                    {isLoading ? (
                        <Grid item container justifyContent="center">
                            <CircularProgress />
                        </Grid>
                    ) : (
                    <>
                    {sectorUsers.length > 0 ? (
                        <BaseTable
                        rows={sectorUsers}
                        columns={columnsUsers}
                        checkBox={false}
                        paginationMode="client"
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 10,
                            },
                        },
                        }}
                        isLoading={isLoading}
                        />
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                        Nenhum dado encontrado.
                        </Typography>
                    )}
                    </>
                    )}
                </Grid>
            </Grid>
            <Grid container spacing={2} mb={6}>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                    Equipamentos do Setor
                    </Typography>
                    {isLoading ? (
                        <Grid item container justifyContent="center">
                            <CircularProgress />
                        </Grid>
                    ) : (
                    <>
                    {sectorEquipments.length > 0 ? (
                        <BaseTable
                        rows={sectorEquipments}
                        columns={columnsEquipments}
                        checkBox={false}
                        paginationMode="client"
                        initialState={{
                            pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                            },
                        }}
                        isLoading={isLoading}
                        />
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                        Nenhum dado encontrado.
                        </Typography>
                    )}
                    </>
                    )}
                </Grid>
            </Grid>
        </Container>
    
    </>);

};