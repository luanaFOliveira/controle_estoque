import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Container, Grid, Typography,} from "@mui/material";
import BaseTable from "../../../components/shared/BaseTable";
import {useNavigate, useParams} from "react-router-dom";
import {toastDelete} from "../../../components/shared/ToastComponents";
import {toast} from "react-toastify";
import {destroySector, getSector} from "../../../services/sectorService";
import {errorToast} from "../../../services/api";
import EquipmentTableColumns from "../../../components/columns/EquipmentTableColumns";
import UserTableColumns from "../../../components/columns/UserTableColumns";
import {CustomTabPanel, TableTab} from "../../../components/shared/TableTab";

function ViewSector() {
    const navigate = useNavigate();
    const {sectorId} = useParams();
    const [sectorDetail, setSectorDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    const columnsEquip = EquipmentTableColumns({user_admin: true});
    const columnsUser = UserTableColumns({user_admin: true});

    const fetchSectorDetail = async () => {
        setLoading(true);
        try {
            await getSector(sectorId)
              .then((res) => {
                  setSectorDetail(res.data);
              });
        } catch (error) {
            console.error(error);
            errorToast(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSectorDetail();
    }, [sectorId]);

    const handleDestroy = async () => {
        try {
            await destroySector(sectorId)
              .then(() => {
                  toast.success("Setor deletado com sucesso!");
                  navigate("/sectors")
              })
        } catch (error) {
            console.error(error);
            toast.error("Erro ao tentar deletar setor. Por favor, tente novamente.");
        }
    };

    return (
        <Container sx={{mt: 5}}>
            {sectorDetail && (
                <>
                    <Grid container justifyContent="space-between">
                        <Grid>
                            <Typography variant="h4" fontWeight="bold" sx={{mb: 2}}>
                                {sectorDetail.name}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    navigate(`/sectors/edit/${sectorId}`);
                                }}
                                sx={{marginRight: 1}}
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
                            >
                                REMOVER SETOR
                            </Button>
                        </Grid>
                    </Grid>
                    <TableTab value={tabValue} setValue={setTabValue} nameTabs={["Usuários", "Equipamentos"]}/>
                    <CustomTabPanel value={tabValue} index={0}>
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
