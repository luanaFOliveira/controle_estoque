import React, { useEffect, useState } from "react";
import BaseTable from "../../components/shared/BaseTable";
import { Box,Grid,Typography,CircularProgress, Container } from "@mui/material";
import { useStateContext } from "../../context/GlobalContext";
import UserTableColumns from "../../components/columns/UserTableColumns";
import EquipmentTableColumns from "../../components/columns/EquipmentTableColumns";
import { getSector } from "../../services/sectorService";
import { errorToast } from "../../services/api";
import { CustomTabPanel, TableTab } from '../../components/shared/TableTab';
import FilterBox from '../../components/shared/FilterBox';


export default function SectorPage() {

  const { sector } = useStateContext();
  const [firstLoading, setFirstLoading] = useState(true);

  const [sectorInfo, setSectorInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sectorUsers, setSectorUsers] = useState([]);
  const [sectorEquipments, setSectorEquipments] = useState([]);

  const columnsUsers = UserTableColumns({ user_admin: false });
  const columnsEquipments = EquipmentTableColumns({ user_admin: false });
  
  const [tabValue, setTabValue] = useState(0);

  const [filter, setFilter] = useState({
    equipment_code: "none",
    user_name: "none",
  });

  useEffect(() => {
    fetchSector();
  }, [sector,filter]);

  const fetchSector = async () => {
    setIsLoading(true);
    try {
      await getSector({sector_id:sector,filter:{user_name:filter.user_name,equipment_code:filter.equipment_code}})
      .then((res) =>{
        setSectorInfo(res.data);
        setSectorUsers(res.data.users);
        setSectorEquipments(res.data.equipments);
      });
    } catch (error) {
      console.error(error);
      errorToast(error);
    } finally {
      setIsLoading(false);
      setFirstLoading(false);
    }
  };

  const handleChangeEquip = (equipment_code) => {
    setFilter((prevFilter) => ({ ...prevFilter, equipment_code }));
  };

  const handleChangeUser = (user_name) => {
      setFilter((prevFilter) => ({ ...prevFilter, user_name }));
  };
  
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
              <TableTab value={tabValue} setValue={setTabValue} nameTabs={["Usuários do Setor", "Equipamentos do setor"]}/>
              <CustomTabPanel value={tabValue} index={0}>
                <FilterBox onSearch={handleChangeUser} disponibility={false} label='Pesquisar Nome do usuario' disponibilityLabels={["Disponivel","Não disponivel"]} />
                <BaseTable
                  rows={sectorUsers}
                  columns={columnsUsers}
                  getRowId={(row) => row.user_id}
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
              </CustomTabPanel>
              <CustomTabPanel value={tabValue} index={1}>
                <FilterBox onSearch={handleChangeEquip} disponibility={false} label='Pesquisar Código do equipamento' disponibilityLabels={["Disponivel","Não disponivel"]} />
                <BaseTable
                  rows={sectorEquipments}
                  columns={columnsEquipments}
                  getRowId={(row) => row.equipment_id}
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
              </CustomTabPanel>
            </Box>

          </>
        )}
      </Container>
    </>
  );
}
