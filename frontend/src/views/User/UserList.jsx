import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import axiosClient from "../../axios-client";
import BaseTable from "../../components/shared/BaseTable";
import {useNavigate} from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowCount, setRowCount] = useState(0);
    const [firstLoading, setFirstLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState({
        page: 0, pageSize: 10,
    });

    const columnsUser = [{
        field: "id", headerName: "ID", width: 70,
    }, {
        field: "name", headerName: "Nome", width: 250, sortable: false,
    }, {
        field: "email", headerName: "Email", width: 300, sortable: false,
    }, {
        field: "is_admin",
        headerName: "ADM",
        width: 250,
        sortable: false,
        renderCell: (params) => (params.value ? <CheckIcon/> : <CloseIcon/>)
    },];

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/users?page=${paginationModel.page + 1}`,);
            const usersWithId = response.data.data.map((user) => ({
                ...user, id: user.user_id,
            }));
            setUsers(usersWithId);
            setRowCount((prevRowCountState) => response.data.meta.total !== undefined ? response.data.meta.total : prevRowCountState,);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
            setFirstLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [paginationModel.page]);

    return (<Container sx={{mt: 5}}>
        <Button
            variant="contained"
            sx={{mt: 3, mb: 2}}
            onClick={() => navigate('/addUser')}
        >
            Criar Usuário
        </Button>
        {firstLoading ? (<Grid item container justifyContent="center">
            <CircularProgress/>
        </Grid>) : (<BaseTable
            rows={users}
            columns={columnsUser}
            checkBox={false}
            rowCount={rowCount}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            isLoading={loading}
        />)}
    </Container>);
}

export default UserList;
