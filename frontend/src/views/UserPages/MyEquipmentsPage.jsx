import React ,{ useState,useEffect }from 'react';
import BaseTable from '../../components/shared/BaseTable';
import {CircularProgress, Container,Typography,Grid,Box} from "@mui/material";
import { useAuth } from "../../context/AuthProvider";
import { MyEquipmentTableColumns } from '../../components/columns/MyEquipmentTablesColumns';
import { getUserHistory } from "../../services/historyService";
import { errorToast } from "../../services/api";
import { CustomTabPanel, TableTab } from '../../components/shared/TableTab';

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
    
    const columnsEquipAvailable = MyEquipmentTableColumns({
        setReload:setReload,
        availability: true,
    });
    const columnsEquipUnavailable = MyEquipmentTableColumns({
        setReload:setReload,
        availability: false,
    });

    const [tabValue, setTabValue] = React.useState(0);


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

    
    

    return(<>
        <Container sx={{mt: 5}}>
            {firstLoading ? (
            <Grid item container justifyContent="center">
                <CircularProgress />
            </Grid>
            ) : (
            <>
                <Box sx={{ width: '100%' }}>
                    <TableTab value={tabValue} setValue={setTabValue} nameTab1="Equipamentos Ativos" nameTab2="Historico de equipamentos" />
                    <CustomTabPanel value={tabValue} index={0}>
                        <BaseTable
                            rows={equipAvailable}
                            columns={columnsEquipAvailable}
                            getRowId={(row) => row.user_equipment_id}
                            rowCount={rowCountEquipAva}
                            paginationModel={paginationModelEquipAva}
                            setPaginationModel={setPaginationModelEquipAva}
                            isLoading={isLoadingEquipAva}
                            minHeight={200}
                            maxHeight={620}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <BaseTable
                            rows={equipUnavailable}
                            columns={columnsEquipUnavailable}
                            getRowId={(row) => row.user_equipment_id}
                            rowCount={rowCountEquipUna}
                            paginationModel={paginationModelEquipUna}
                            setPaginationModel={setPaginationModelEquipUna}
                            isLoading={isLoadingEquipUna}
                            minHeight={200}
                            maxHeight={620}
                        />
                    </CustomTabPanel>
                </Box>
                
            </>
            )}
        </Container>
</>);

};
