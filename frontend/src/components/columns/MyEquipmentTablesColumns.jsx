import UndoIcon from '@mui/icons-material/Undo';
import { Button, Link, Tooltip, Typography } from "@mui/material";
import { toastConfirmation } from "../shared/ToastComponents";
import { toast } from "react-toastify";
import { returnEquipment } from "../../services/equipmentRequestService";
import { errorToast } from "../../services/api";


export function MyEquipmentAvailableTableColumns({setReload}) {

    const handleClick = async (row) => {
        try {
            const response = await returnEquipment({
                equipment: row.equipment.map((equip) => equip.equipment_id),
            });
            if (response) {
                toast.success(`Equipamento devolvido com sucesso`);
                setReload((prev) => !prev);
            }
        } catch (error) {
          console.error(error);
          errorToast(error);
        }
    }


  return [
    {
        field: 'equipment_code',
        headerName: 'Codigo',
        flex:1,
    },
    {
        field: 'name',
        headerName: 'Nome',
        flex:1,
        valueGetter: (params) =>
            params.row.equipment.map((equip) => equip.name).join(","),
    },
    {
        field: 'brand',
        headerName: 'Marca',
        flex:1,
        valueGetter: (params) =>
            params.row.equipment.map((equip) => equip.equipment_brand).join(","),
    },
    {
        field: 'type',
        headerName: 'Tipo',
        flex:1,
        valueGetter: (params) =>
            params.row.equipment.map((equip) => equip.equipment_type).join(","),
    },
    {
        field: "is_at_office",
        headerName: "Local",
        flex:1,
        renderCell: (params) =>
            params.value ? params.row.equipment.map((equip) => equip.sector).join(",") : "Fora do escritório",
    },
    {
        field: "return_equipment",
        headerName: "Devolver Equipamento",
        flex:1,
        align: 'center',
        renderCell: (params) => (
          <>
            <Button
              sx={{ display: "flex", color: "blue" }}
              onClick={() =>
                toastConfirmation({
                  item: "Devolver Equipamento",
                  handleClick: () => handleClick(params.row),
                })
              }
            >
              <UndoIcon />
            </Button>
          </>
        ),
    },

];
}

export function MyEquipmentUnavailableTableColumns() {
    return [
    {
        field: 'equipment_code',
        headerName: 'Codigo',
        flex:1,
    },
    {
        field: 'name',
        headerName: 'Nome',
        flex:1,
        valueGetter: (params) =>
            params.row.equipment.map((equip) => equip.name).join(","),
    },
    {
        field: 'brand',
        headerName: 'Marca',
        flex:1,
        valueGetter: (params) =>
            params.row.equipment.map((equip) => equip.equipment_brand).join(","),
    },
    {
        field: 'type',
        headerName: 'Tipo',
        flex:1,
        valueGetter: (params) =>
            params.row.equipment.map((equip) => equip.equipment_type).join(","),
    },
    {
        field: "is_at_office",
        headerName: "Local",
        flex:1,
        renderCell: (params) =>
            params.value ? params.row.equipment.map((equip) => equip.sector).join(",") : "Fora do escritório",
    },
    {
        field: "created_at",
        headerName: "Criado em",
        flex:1,
        valueFormatter: (params) => {
            const date = new Date(params.value);
            return date.toLocaleString("pt-BR");
        },
    },
    {
        field: "returned_at",
        headerName: "Data de Devolução",
        flex:1,
        valueFormatter: (params) => {
          if (params.value === null) {
            return "Em uso";
          }
          const date = new Date(params.value);
          return date.toLocaleString("pt-BR");
        },
    },

  ];
  }
