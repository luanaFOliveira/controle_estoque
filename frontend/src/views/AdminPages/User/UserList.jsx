import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Container} from '@mui/material';
import Grid from '@mui/material/Grid';
import BaseTable from '../../../components/shared/BaseTable';
import {useNavigate} from 'react-router-dom';
import UserTableColumns from '../../../components/columns/UserTableColumns';
import {indexUsers} from '../../../services/userService';
import FilterBox from '../../../components/shared/FilterBox';

function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firstLoading, setFirstLoading] = useState(true);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0, pageSize: 10,
    });
    const [filter, setFilter] = useState({
        name: '',
    });

    const columnsUser = UserTableColumns({user_admin: true});

    useEffect(() => {
        fetchUsers();
    }, [paginationModel.page, filter]);

    const fetchUsers = async () => {
        setLoading(true);
        const page = paginationModel.page + 1;
        const res = await indexUsers({
            page: page, name: filter.name,
        }).finally(() => {
            setLoading(false);
            setFirstLoading(false);
        })
        if (res) {
            setUsers(res.data);
            setRowCount((prevRowCountState) => res.meta.total ?? prevRowCountState);
        }
    };

    const handleSearch = (name) => {
        setFilter((prevFilter) => ({
            ...prevFilter, name
        }));
    };

    return (<Container sx={{mt: 5, pr:0.5}}>
        <Button
            variant="contained"
            sx={{mb: 2}}
            onClick={() => navigate('/users/new')}
        >
            Registrar Usuário
        </Button>
        {!firstLoading ? (<>
            <FilterBox onSearch={handleSearch} disponibility={false}
                       label="Pesquisar nome de usuário"/>
            <BaseTable
                rows={users}
                columns={columnsUser}
                getRowId={(row) => row.user_id}
                rowCount={rowCount}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                loading={loading}
            />
        </>) : (<Grid item container justifyContent="center">
            <CircularProgress/>
        </Grid>)}
    </Container>);
}

export default UserList;
