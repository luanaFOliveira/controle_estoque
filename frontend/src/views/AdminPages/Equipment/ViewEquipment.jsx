import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Card, CardContent, CircularProgress, Container, Grid, Typography,} from "@mui/material";
import {toast} from "react-toastify";
import {toastDelete} from "../../../components/shared/ToastComponents";
import BaseTable from "../../../components/shared/BaseTable";
import {destroyEquipment, getEquipment, getHistoryEquipment,} from "../../../services/equipmentService";
import {errorToast} from "../../../services/api";
import HistoryTableColumns from "../../../components/columns/historyTableColumns";
import {CustomTabPanel, TableTab} from "../../../components/shared/TableTab";

const ViewEquipment = () => {
    const params = useParams();
    const [tabValue, setTabValue] = useState(0);
    const [firstLoading, setFirstLoading] = useState(true);
    const navigate = useNavigate();
    const [equipment, setEquipment] = useState({});
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const columnsHistory = HistoryTableColumns('equipment');

    useEffect(() => {
        const equipment = async () => {
            try {
                const response = await getEquipment(params.equipment_id);
                setEquipment(response.data);
            } catch (error) {
                errorToast(error);
                console.log(error);
            } finally {
                setFirstLoading(false);
            }
        };

        equipment();
    }, []);

    useEffect(() => {
        const history = async () => {
            setIsLoading(true);
            try {
                const response = await getHistoryEquipment(params.equipment_id);
                setHistory(response.data);
                setRowCount(
                    (prevRowCountState) => response.meta.total ?? prevRowCountState,
                );
            } catch (error) {
                errorToast(error);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        history();
    }, [paginationModel.page]);

    const handleDestroy = async () => {
        try {
            const response = await destroyEquipment(params.equipment_id);
            if (response) {
                toast.success("Equipamento deletado com sucesso!");
                navigate("/equipments");
            }
        } catch (error) {
            errorToast(error);
            console.log(error);
        }
    };

    const EquipmentCard = ({label, value}) => {
        return (
            <Card sx={{mb: 2, maxWidth: "700px"}}>
                <CardContent>
                    <Grid container>
                        <Typography variant="body2" width="250px">
                            {label}:
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            {value}
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    return (
        <>
            {!firstLoading ? (
                <Container component="main" maxWidth="sx">
                    <Grid container justifyContent="space-between" marginTop={4}>
                        <Grid>
                            <Typography variant="h4" fontWeight="bold" sx={{mb: 2}}>
                                Equipamento:
                            </Typography>
                        </Grid>
                        <Grid mb={2}>
                            <Button
                                variant="contained"
                                sx={{marginRight: 1}}
                                onClick={() => {
                                    navigate(`/edit-equipment/${params.equipment_id}`);
                                }}
                            >
                                EDITAR
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    toastDelete({
                                        item: "equipamento",
                                        handleClick: handleDestroy,
                                    });
                                }}
                            >
                                REMOVER
                            </Button>
                        </Grid>
                    </Grid>
                    <TableTab value={tabValue} setValue={setTabValue} nameTab1="Usuários"
                              nameTab2="Equipamentos"/>
                    <CustomTabPanel value={tabValue} index={0}>
                        <Grid>
                            <EquipmentCard
                                label="Código do Equipamento"
                                value={equipment.equipment_code}
                            />
                            <EquipmentCard label="Nome do Equipamento" value={equipment.name}/>
                            <EquipmentCard
                                label="Marca do Equipamento"
                                value={equipment.brand}
                            />
                            <EquipmentCard label="Tipo de Equipamento" value={equipment.type}/>
                            <EquipmentCard label="Setor" value={equipment.sector}/>
                            <EquipmentCard
                                label="Status"
                                value={
                                    equipment.is_available
                                        ? "Disponível para uso"
                                        : "Atualmente em uso"
                                }
                            />
                            <EquipmentCard
                                label="Localização Atual"
                                value={
                                    equipment.is_at_office ? "No Escritório" : "Em Home Office"
                                }
                            />
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <BaseTable
                            rows={history}
                            columns={columnsHistory}
                            checkBox={false}
                            getRowId={(row) => row.user_equipment_id}
                            rowCount={rowCount}
                            paginationModel={paginationModel}
                            setPaginationModel={setPaginationModel}
                            isLoading={isLoading}
                            maxWidth={700}
                        />
                    </CustomTabPanel>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                        }}
                        onClick={() => navigate("/equipments")}
                    >
                        Voltar para a Lista de Equipamentos
                    </Button>
                </Container>
            ) : (
                <Grid item container justifyContent="center">
                    <CircularProgress/>
                </Grid>
            )}
        </>
    );
};
export default ViewEquipment;
