import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Container, Grid, Typography,} from "@mui/material";
import BaseTable from "../../../components/shared/BaseTable";
import {useNavigate, useParams} from "react-router-dom";
import {toastDelete} from "../../../components/shared/ToastComponents";
import {toast} from "react-toastify";
import {destroySector, getSector} from "../../../services/sectorService";
import EquipmentTableColumns from "../../../components/columns/EquipmentTableColumns";
import UserTableColumns from "../../../components/columns/UserTableColumns";
import {CustomTabPanel, TableTab} from "../../../components/shared/TableTab";
import FilterBox from '../../../components/shared/FilterBox';
import useMediaQuery from "@mui/material/useMediaQuery";

function ViewSector() {
    const navigate = useNavigate();
    const {sectorId} = useParams();
    const [sectorDetail, setSectorDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const matches = useMediaQuery('(max-width:350px)');
    const columnsEquip = EquipmentTableColumns({user_admin: true});
    const columnsUser = UserTableColumns({user_admin: true});

    const [filter, setFilter] = useState({
        equipment_code: "none",
        user_name: "none",
    });

    const fetchSectorDetail = async () => {
        setLoading(true);
        const res = await getSector({sector_id: sectorId,filter: {user_name: filter.user_name, equipment_code: filter.equipment_code}})
            .finally(() => {
                setLoading(false);
            })
        if (res) {
            setSectorDetail(res.data);
        }
    };

    useEffect(() => {
        fetchSectorDetail();
    }, [sectorId, filter]);

    const handleDestroy = async () => {
        const response = await destroySector(sectorId)
        if (response) {
            toast.success("Setor deletado com sucesso!");
            navigate("/sectors")
        }
    };

    const handleChangeEquip = (equipment_code) => {
        setFilter((prevFilter) => ({...prevFilter, equipment_code}));
    };

    const handleChangeUser = (user_name) => {
        setFilter((prevFilter) => ({...prevFilter, user_name}));
    };


    return (
        <Container sx={{mt: 5}}>
            {sectorDetail && (
                <>
                    <Grid container justifyContent="space-between">
                        <Grid>
                            <Typography variant={matches ? "h5" : "h4"} fontWeight="bold" sx={{mb: 2}}>
                                {sectorDetail.name}
                            </Typography>
                        </Grid>
                        <Grid sx={{display: "flex", alignItems: "center"}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    navigate(`/sectors/edit/${sectorId}`);
                                }}
                                sx={{marginRight: 1, mb: 1}}
                            >
                                EDITAR SETOR
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    toastDelete({
                                        item: "setor",
                                        handleClick: handleDestroy,
                                    });
                                }}
                                sx={{ mb: 1}}
                            >
                                REMOVER SETOR
                            </Button>
                        </Grid>
                    </Grid>
                    <TableTab value={tabValue} setValue={setTabValue} nameTabs={["Usuários", "Equipamentos"]}/>
                    <CustomTabPanel value={tabValue} index={0}>
                        <FilterBox onSearch={handleChangeUser} disponibility={false} label='Pesquisar Nome do usuario'
                                   disponibilityLabels={["Disponivel", "Não disponivel"]}/>
                        <BaseTable
                            rows={sectorDetail.users}
                            getRowId={(row) => row.user_id}
                            columns={columnsUser}
                            loading={loading}
                            paginationMode="client"
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <FilterBox onSearch={handleChangeEquip} disponibility={false}
                                   label='Pesquisar Código do equipamento'
                                   disponibilityLabels={["Disponivel", "Não disponivel"]}/>
                        <BaseTable
                            rows={sectorDetail.equipments}
                            getRowId={(row) => row.equipment_id}
                            columns={columnsEquip}
                            loading={loading}
                            paginationMode="client"
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                        />
                    </CustomTabPanel>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                        }}
                        onClick={() => navigate("/sectors")}
                    >
                        Voltar para a Lista de Setores
                    </Button>
                </>
            )}
            {loading && (
                <Grid item container justifyContent="center">
                    <CircularProgress/>
                </Grid>
            )}
        </Container>
    );
}

export default ViewSector;
