import React, {useEffect, useState} from "react";
import BaseTable from "../../components/shared/BaseTable";
import {Box, CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useStateContext} from "../../context/GlobalContext";
import UserTableColumns from "../../components/columns/UserTableColumns";
import EquipmentTableColumns from "../../components/columns/EquipmentTableColumns";
import {getSector} from "../../services/sectorService";
import {errorToast} from "../../services/api";
import {CustomTabPanel, TableTab} from '../../components/shared/TableTab';


export default function SectorPage() {

    const {sector} = useStateContext();
    const [firstLoading, setFirstLoading] = useState(true);

    const [sectorInfo, setSectorInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sectorUsers, setSectorUsers] = useState([]);
    const [sectorEquipments, setSectorEquipments] = useState([]);

    const columnsUsers = UserTableColumns({user_admin: false});
    const columnsEquipments = EquipmentTableColumns({user_admin: false});

    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        fetchSector();
    }, [sector]);

    const fetchSector = async () => {
        setIsLoading(true);
        try {
            if(sector) {
                await getSector(sector)
                    .then((res) => {
                        setSectorInfo(res.data);
                        setSectorUsers(res.data.users);
                        setSectorEquipments(res.data.equipments);
                    });
            }
        } catch (error) {
            console.error(error);
            errorToast(error);
        } finally {
            setIsLoading(false);
            setFirstLoading(false);
        }
    };


    return (
        <>
            <Container sx={{mt: 5}}>
                {firstLoading ? (
                    <Grid item container justifyContent="center">
                        <CircularProgress/>
                    </Grid>
                ) : (
                    <>
                        <Box sx={{width: '100%'}}>
                            <Typography variant="h4" fontWeight="bold" sx={{mb: 2}}>
                                {sectorInfo.name}
                            </Typography>
                            <TableTab value={tabValue} setValue={setTabValue}
                                      nameTabs={["Usuários do Setor", "Equipamentos do setor"]}/>
                            <CustomTabPanel value={tabValue} index={0}>
                                <BaseTable
                                    rows={sectorUsers}
                                    columns={columnsUsers}
                                    getRowId={(row) => row.user_id}
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
                            </CustomTabPanel>
                            <CustomTabPanel value={tabValue} index={1}>
                                <BaseTable
                                    rows={sectorEquipments}
                                    columns={columnsEquipments}
                                    getRowId={(row) => row.equipment_id}
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
                            </CustomTabPanel>
                        </Box>

                    </>
                )}
            </Container>
        </>
    );
}
