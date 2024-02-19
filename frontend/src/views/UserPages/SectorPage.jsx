import React, { useEffect, useState } from "react";
import BaseTable from "../../components/shared/BaseTable";
import { Box,Grid,Typography,CircularProgress, Container } from "@mui/material";
import { useStateContext } from "../../context/GlobalContext";
import UserTableColumns from "../../components/columns/UserTableColumns";
import EquipmentTableColumns from "../../components/columns/EquipmentTableColumns";
import { getSector } from "../../services/sectorService";
import { errorToast } from "../../services/api";
import { CustomTabPanel, TableTab } from '../../components/shared/TableTab';


export default function SectorPage() {
  const { sector } = useStateContext();
  const [firstLoading, setFirstLoading] = useState(true);


  const [sectorInfo, setSectorInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sectorUsers, setSectorUsers] = useState([]);
  const [sectorEquipments, setSectorEquipments] = useState([]);

  const columnsUsers = UserTableColumns({ user_admin: false });
  const columnsEquipments = EquipmentTableColumns({ user_admin: false });

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
        setFirstLoading(false);
      }
    };
    fetchSector().then((r) => {});
  }, []);

  const [value, setValue] = React.useState('0');


  return (
    <>
      <Container sx={{ mt: 5 }}>
        {firstLoading ? (
          <Grid item container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                {sectorInfo.name}
              </Typography>
              <TableTab value={value} setValue={setValue} nameTab1="Usuários do Setor" nameTab2="Equipamentos do setor" />
              <CustomTabPanel value={value} index={0}>
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
                  maxHeight={620}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
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
                  maxHeight={620}
                />
              </CustomTabPanel>
            </Box>

          </>
        )}
      </Container>
    </>
  );
}
