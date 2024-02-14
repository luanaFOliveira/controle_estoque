import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import BaseTable from "../../../components/shared/BaseTable";
import { useNavigate } from "react-router-dom";
import UserTableColumns from "../../../components/columns/UserTableColumns";
import { errorToast } from "../../../services/api";
import { indexUsers } from "../../../services/userService";

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columnsUser = UserTableColumns();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const page = paginationModel.page + 1;
      const response = await indexUsers(page);
      if (response) {
        setUsers(response.data);
        setRowCount(
          (prevRowCountState) => response.meta.total ?? prevRowCountState,
        );
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [paginationModel.page]);

  return (
    <Container sx={{ mt: 5 }}>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate("/users/new")}
      >
        Registrar Usuário
      </Button>
      {users.length > 0 ? (
        <BaseTable
          rows={users}
          columns={columnsUser}
          getRowId={(row) => row.user_id}
          checkBox={false}
          rowCount={rowCount}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          loading={loading}
        />
      ) : (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </Container>
  );
}

export default UserList;
