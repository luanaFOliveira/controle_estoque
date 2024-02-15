import React, { useEffect, useState } from "react";
import BaseTable from "../../components/shared/BaseTable";
import Grid from "@mui/material/Grid";
import { CircularProgress, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useStateContext } from "../../context/GlobalContext";
import UserTableColumns from "../../components/columns/UserTableColumns";
import EquipmentTableColumns from "../../components/columns/EquipmentTableColumns";
import { getSector } from "../../services/sectorService";
import { errorToast } from "../../services/api";


export default function SectorPage() {
  const { sector } = useStateContext();
  const [sectorInfo, setSectorInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sectorUsers, setSectorUsers] = useState([]);
  const [sectorEquipments, setSectorEquipments] = useState([]);

  const columnsUsers = UserTableColumns(false);
  const columnsEquipments = EquipmentTableColumns(false);

  useEffect(() => {
    const fetchSector = async () => {
      setIsLoading(true);
      try {
        const response = await getSector(sector);
        if (response) {
          setSectorInfo(response.data);
          setSectorUsers(response.data.users);
          setSectorEquipments(response.data.equipments);
        }
      } catch (error) {
        console.error(error);
        errorToast(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSector().then((r) => {});
  }, []);

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          {sectorInfo.name}
        </Typography>
        {!isLoading ? (
          <>
            <Grid container spacing={2} mb={6}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Usuários do Setor
                </Typography>
                {sectorUsers.length > 0 ? (
                  <BaseTable
                    rows={sectorUsers}
                    columns={columnsUsers}
                    getRowId={(row) => row.user_id}
                    checkBox={false}
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
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    Nenhum dado encontrado.
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} mb={6}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
                  Equipamentos do Setor
                </Typography>
                {sectorEquipments.length > 0 ? (
                  <BaseTable
                    rows={sectorEquipments}
                    columns={columnsEquipments}
                    getRowId={(row) => row.equipment_id}
                    checkBox={false}
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
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    Nenhum dado encontrado.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid item container justifyContent="center">
            <CircularProgress />
          </Grid>
        )}
      </Container>
    </>
  );
}
