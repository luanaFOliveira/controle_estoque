import React ,{ useState,useEffect }from 'react';
import BaseTable from '../../components/shared/BaseTable';
import {CircularProgress, Container,Typography,Grid,Box} from "@mui/material";
import { useAuth } from "../../context/AuthProvider";
import { MyEquipmentTableColumns } from '../../components/columns/MyEquipmentTablesColumns';
import { getUserHistory } from "../../services/historyService";
import { errorToast } from "../../services/api";
import { CustomTabPanel, TableTab } from '../../components/shared/TableTab';
import FilterBox from '../../components/shared/FilterBox';

export default function MyEquipmentsPage() {
    const {user} = useAuth();

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

    const [tabValue, setTabValue] = useState(0);

    const [filter, setFilter] = useState({
        searchAva: "none",
        searchUna: "none",
    });

    useEffect(() => {
        fetchEquipmentsAvailable();
    },[paginationModelEquipAva.page,reload,filter]);

    useEffect(() => {
        fetchEquipmentsUnavailable();
    },[paginationModelEquipUna.page,reload,filter]);

    const fetchEquipmentsAvailable = async () => {
        setIsLoadingEquipAva(true);
        try{
            await getUserHistory({
                user_id: user.user_id,
                availability: "available",
                equipment_code: filter.searchAva,
            }).then((res) => {
                setEquipAvailable(res.data);
                setRowCountEquipAva((prevRowCountState) => res.meta.total ?? prevRowCountState,);
            });
        }catch(error){
            errorToast(error);
            console.error(error);
        }finally{
            setIsLoadingEquipAva(false);
            setFirstLoading(false);
        }
    };

    const fetchEquipmentsUnavailable = async () => {
        setIsLoadingEquipUna(true);
        try{
            await getUserHistory({
                user_id: user.user_id,
                availability: "unavailable",
                equipment_code: filter.searchUna,
            })
            .then((res)=>{
                setEquipUnavailable(res.data);
                setRowCountEquipUna((prevRowCountState) => res.meta.total ?? prevRowCountState,);
            });
        }catch(error){
            errorToast(error);
            console.error(error);
        }finally{
            setIsLoadingEquipUna(false);
            setFirstLoading(false);
        }
    };

    const handleSearchAva = (searchAva) => {
        setFilter((prevFilter) => ({ ...prevFilter, searchAva }));
    };

    const handleSearchUna = (searchUna) => {
        setFilter((prevFilter) => ({ ...prevFilter, searchUna }));
    };

    return(<>
        <Container sx={{mt: 5}}>
            {firstLoading ? (
            <Grid item container justifyContent="center">
                <CircularProgress />
            </Grid>
            ) : (
            <>
                <Box sx={{ width: '100%' }}>
                    <TableTab value={tabValue} setValue={setTabValue} nameTabs={["Equipamentos Ativos","Historico de equipamentos"]}/>
                    <CustomTabPanel value={tabValue} index={0}>
                        <FilterBox onSearch={handleSearchAva} disponibility={false} label='Pesquisar Código do equipamento' disponibilityLabels={["Disponivel","Não disponivel"]} />
                        <BaseTable
                            rows={equipAvailable}
                            columns={columnsEquipAvailable}
                            getRowId={(row) => row.user_equipment_id}
                            rowCount={rowCountEquipAva}
                            paginationModel={paginationModelEquipAva}
                            setPaginationModel={setPaginationModelEquipAva}
                            isLoading={isLoadingEquipAva}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <FilterBox onSearch={handleSearchUna} disponibility={false} label='Pesquisar Código do equipamento' disponibilityLabels={["Disponivel","Não disponivel"]} />
                        <BaseTable
                            rows={equipUnavailable}
                            columns={columnsEquipUnavailable}
                            getRowId={(row) => row.user_equipment_id}
                            rowCount={rowCountEquipUna}
                            paginationModel={paginationModelEquipUna}
                            setPaginationModel={setPaginationModelEquipUna}
                            isLoading={isLoadingEquipUna}
                        />
                    </CustomTabPanel>
                </Box>
            </>
            )}
        </Container>
</>);

};
