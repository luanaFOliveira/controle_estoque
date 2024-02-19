import React ,{ useState,useEffect }from 'react';
import BaseTable from '../../components/shared/BaseTable';
import Grid from '@mui/material/Grid';
import axiosClient from "../../axios-client";
import {CircularProgress, Container} from "@mui/material";
import Typography from '@mui/material/Typography';
import { useAuth } from "../../context/AuthProvider";
import { MyEquipmentTableColumns } from '../../components/columns/MyEquipmentTablesColumns';
import { getUserHistory } from "../../services/historyService";
import { errorToast } from "../../services/api";

export default function MyEquipmentsPage() {
    const { user} = useAuth();

    const [firstLoading, setFirstLoading] = useState(true);

    const [equipAvailable, setEquipAvailable] = useState([]);
    const [equipUnavailable, setEquipUnavailable] = useState([]);

    const [isLoadingEquipAva, setIsLoadingEquipAva] = useState(true);
    const [isLoadingEquipUna, setIsLoadingEquipUna] = useState(true);
    
    const [rowCountEquipAva, setRowCountEquipAva] = useState(0);
    const [rowCountEquipUna, setRowCountEquipUna] = useState(0);

    const [paginationModelEquipAva, setPaginationModelEquipAva] = useState({ page: 0, pageSize: 10 });
    const [paginationModelEquipUna, setPaginationModelEquipUna] = useState({ page: 0, pageSize: 10 });
    const [reload, setReload] = useState(false);


    useEffect(() => {
        const fetchEquipmentsAvailable = async () => {
            setIsLoadingEquipAva(true);
            try{
                const response = await getUserHistory({
                    user_id: user.user_id,
                    filter: "available",
                });
                setEquipAvailable(response.data);
                setRowCountEquipAva((prevRowCountState) => response.meta.total ?? prevRowCountState,);
            }catch(error){
                errorToast(error);
                console.error(error);
            }finally{
                setIsLoadingEquipAva(false);
                setFirstLoading(false);
            }

        };
        fetchEquipmentsAvailable().then(r => {
        });

    },[paginationModelEquipAva.page,reload]);

    useEffect(() => {
        const fetchEquipmentsUnavailable = async () => {
            setIsLoadingEquipUna(true);
            try{
                const response = await getUserHistory({
                    user_id: user.user_id,
                    filter: "unavailable",
                });
                setEquipUnavailable(response.data);
                setRowCountEquipUna((prevRowCountState) => response.meta.total ?? prevRowCountState,);
            
            }catch(error){
                errorToast(error);
                console.error(error);
            }finally{
                setIsLoadingEquipUna(false);
                setFirstLoading(false);
            }

        };
        fetchEquipmentsUnavailable().then(r => {
        });

    },[paginationModelEquipUna.page,reload]);

    
    const columnsEquipAvailable = MyEquipmentTableColumns({
        setReload:setReload,
        availability: true,
    });
    const columnsEquipUnavailable = MyEquipmentTableColumns({
        setReload:setReload,
        availability: false,
    });
    
 
    return(<>
        <Container sx={{mt: 5}}>
            {firstLoading ? (
            <Grid item container justifyContent="center">
                <CircularProgress />
            </Grid>
            ) : (
            <>
                <Typography component="h1" variant="h4">
                    Equipamentos ativos
                </Typography>
                <BaseTable
                    rows={equipAvailable}
                    columns={columnsEquipAvailable}
                    checkBox={false}
                    getRowId={(row) => row.user_equipment_id}
                    rowCount={rowCountEquipAva}
                    paginationModel={paginationModelEquipAva}
                    setPaginationModel={setPaginationModelEquipAva}
                    isLoading={isLoadingEquipAva}
                    minHeight={200}
                    maxHeight={620}
                />
                <Typography component="h1" variant="h4">
                    Historico de equipamentos
                </Typography>
                <BaseTable
                    rows={equipUnavailable}
                    columns={columnsEquipUnavailable}
                    checkBox={false}
                    getRowId={(row) => row.user_equipment_id}
                    rowCount={rowCountEquipUna}
                    paginationModel={paginationModelEquipUna}
                    setPaginationModel={setPaginationModelEquipUna}
                    isLoading={isLoadingEquipUna}
                    minHeight={200}
                    maxHeight={620}
                />
            </>
            )}
        </Container>
</>);

};
