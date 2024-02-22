import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CircularProgress, Container, Grid, Link, Typography,} from "@mui/material";
import {toast} from "react-toastify";
import {toastDelete} from "../../../components/shared/ToastComponents";
import {destroyEquipment, getEquipment, getHistoryEquipment,} from "../../../services/equipmentService";
import HistoryTableColumns from "../../../components/columns/historyTableColumns";
import {CustomTabPanel, TableTab} from "../../../components/shared/TableTab";
import BaseTable from "../../../components/shared/BaseTable";
import {EquipmentCard} from "../../../components/Equipment/EquipmentCard";
import {ButtonReturn} from "../../../components/shared/ButtonReturn";

const ViewEquipment = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [firstLoading, setFirstLoading] = useState(true);
    const [equipment, setEquipment] = useState({});
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0, pageSize: 10,
    });
    const columnsHistory = HistoryTableColumns('equipment');

    useEffect(() => {
        getEquipmentData();
    }, []);

    useEffect(() => {
        getHistoryData();
    }, [paginationModel.page]);

    const getEquipmentData = async () => {
        const res = await getEquipment(params.equipment_id)
            .finally(() => {
                setFirstLoading(false);
            });
        if (res) {
            setEquipment(res.data);
        }
    };

    const getHistoryData = async () => {
        setIsLoading(true);
        const res = await getHistoryEquipment(params.equipment_id)
            .finally(() => {
                setIsLoading(false);
            });
        if (res) {
            setHistory(res.data);
            setRowCount((prevRowCountState) => res.meta.total ?? prevRowCountState);
        }
    };

    const handleDestroy = async () => {
        const res = await destroyEquipment(params.equipment_id)
        if (res) {
            toast.success("Equipamento deletado com sucesso!");
            navigate("/equipments");
        }
    };

    return (<>
        {!firstLoading ? (<Container component="main" maxWidth="sx">
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
                                item: "equipamento", handleClick: handleDestroy,
                            });
                        }}
                    >
                        REMOVER
                    </Button>
                </Grid>
            </Grid>
            <TableTab value={tabValue} setValue={setTabValue} nameTabs={["Informações", "Histórico"]}/>
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
                        value={equipment.is_available ? "Disponível para uso" :
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                {"Atualmente em uso por:"}
                                <Link
                                    key={equipment.user.user_id}
                                    onClick={() => {
                                        navigate(`/users/${equipment.user.user_id}`);
                                    }}
                                    underline="hover"
                                    sx={{
                                        cursor: "pointer", marginLeft: "10px",
                                    }}
                                >
                                    {equipment.user.name}
                                </Link>
                            </Box>}
                    />
                    <EquipmentCard
                        label="Localização Atual"
                        value={equipment.is_at_office ? "No Escritório" : "Em Home Office"}
                    />
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <BaseTable
                    rows={history}
                    columns={columnsHistory}
                    getRowId={(row) => row.user_equipment_id}
                    rowCount={rowCount}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                    isLoading={isLoading}
                    maxWidth={700}
                />
            </CustomTabPanel>
            <ButtonReturn label="Equipamentos" redirect="/equipments"/>
        </Container>) : (<Grid item container justifyContent="center">
            <CircularProgress/>
        </Grid>)}
    </>);
};

export default ViewEquipment;
