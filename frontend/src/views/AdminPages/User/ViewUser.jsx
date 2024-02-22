import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardContent, CircularProgress, Container, Grid, Link, Typography,} from "@mui/material";
import {toast} from "react-toastify";
import {toastDelete} from "../../../components/shared/ToastComponents";
import BaseTable from "../../../components/shared/BaseTable";
import HistoryTableColumns from "../../../components/columns/historyTableColumns";
import {destroyUser, getUser} from "../../../services/userService";
import {getUserHistory} from "../../../services/historyService";
import {CustomTabPanel, TableTab} from "../../../components/shared/TableTab";

const ViewUser = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    const [firstLoading, setFirstLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    const [userDetail, setUserDetail] = useState({});
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0, pageSize: 10,
    });

    const columnsHistory = HistoryTableColumns('user');

    useEffect(() => {
        fetchUserDetail();
    }, [userId]);

    const fetchUserDetail = async () => {
        setLoading(true);
        const res = await getUser(userId)
            .finally(() => {
                setLoading(false);
                setFirstLoading(false);
            })
        if (res) {
            setUserDetail(res.data);
        }
    };

    useEffect(() => {
        const fetchUserHistory = async () => {
            setLoading(true);
            const res = await getUserHistory({
                user_id: userId,
            }).finally(() => {
                setLoading(false);
                setFirstLoading(false);
            });
            if (res) {
                setHistory(res.data);
                setRowCount((prevRowCountState) => res.meta.total ?? prevRowCountState,);
            }
        };

        fetchUserHistory();
    }, [paginationModel.page]);

    const handleDestroy = async () => {
        const res = await destroyUser(userId);
        if (res) {
            toast.success("Usuário deletado com sucesso!");
            navigate("/users");
        }
    };

    const UserCard = ({label, value}) => {
        return (<Card
            sx={{
                mb: 2, maxWidth: "700px",
            }}
        >
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
        </Card>);
    };

    return (<>
        <Container component="main" maxWidth="sx">
            {firstLoading ? (<Grid item container justifyContent="center" marginTop={3}>
                <CircularProgress/>
            </Grid>) : (<>
                <Grid container justifyContent="space-between" marginTop={4}>
                    <Grid>
                        <Typography variant="h4" fontWeight="bold" sx={{mb: 2}}>
                            Usuário:
                        </Typography>
                    </Grid>
                    <Grid mb={2}>
                        <Button
                            variant="contained"
                            sx={{marginRight: 1}}
                            onClick={() => {
                                navigate(`/users/edit/${userId}`);
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
                        <UserCard label="Nome do Usuário" value={userDetail.name}/>
                        <UserCard label="Email do Usuário" value={userDetail.email}/>
                        <Card
                            sx={{
                                mb: 2, maxWidth: "700px",
                            }}
                        >
                            <CardContent>
                                <Grid container sx={{
                                    display: "flex", flexDirection: "column", justifyContent: "start",
                                }}>
                                    <Typography variant="body2" width="250px">
                                        Setores do Usuário:
                                    </Typography>
                                    {userDetail.sectors && userDetail.sectors.length > 0 ? (<>
                                        {userDetail.sectors.map((sector) => {
                                            return (<Link
                                                key={sector.sector_id}
                                                component="button"
                                                onClick={() => {
                                                    navigate(`/sectors/${sector.sector_id}`);
                                                }}
                                                underline="hover"
                                                sx={{
                                                    cursor: "pointer",
                                                    marginLeft: "20px",
                                                    marginTop: "5px",
                                                    justifyContent: 'start',
                                                    display: "flex"
                                                }}
                                            >
                                                {sector.name}
                                            </Link>);
                                        })}
                                    </>) : (<Typography variant="body2">
                                        Nenhum setor encontrado.
                                    </Typography>)}
                                </Grid>
                            </CardContent>
                        </Card>
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
                        isLoading={loading}
                        maxWidth={700}
                    />
                </CustomTabPanel>
                <Button
                    variant="contained"
                    sx={{
                        mt: 3, mb: 2,
                    }}
                    onClick={() => navigate("/users")}
                >
                    Voltar para a Lista de Usuários
                </Button>
            </>)}
        </Container>
    </>);
};

export default ViewUser;
