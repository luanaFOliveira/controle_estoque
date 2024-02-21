import UndoIcon from '@mui/icons-material/Undo';
import {Button} from "@mui/material";
import {toastConfirmation} from "../shared/ToastComponents";
import {toast} from "react-toastify";
import {returnEquipment} from "../../services/equipmentRequestService";
import {changeEquipmentLocation} from "../../services/equipmentService";
import {errorToast} from "../../services/api";
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';

export function MyEquipmentTableColumns({setReload, availability}) {

    const handleClickDevolver = async (row) => {
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

    const handleClickLocalizacao = async (row, action) => {
        try {
            const response = await changeEquipmentLocation({
                equipment_id: row.equipment.map((equip) => equip.equipment_id).join(","),
                action: action,
            });
            if (response) {
                toast.success(`Localização do equipamento alterada com sucesso`);
                setReload((prev) => !prev);
            }
        } catch (error) {
            console.error(error);
            errorToast(error);
        }
    }

    let columns = [
        {
            field: 'equipment_code',
            headerName: 'Codigo',
            flex: 1,
            minWidth: 100,
            sortable: false,
            valueGetter: (params) =>
                params.row.equipment.map((equip) => equip.equipment_code).join(","),
        },
        {
            field: 'name',
            headerName: 'Nome',
            flex: 1,
            minWidth: 150,
            sortable: false,
            valueGetter: (params) =>
                params.row.equipment.map((equip) => equip.name).join(","),
        },
        {
            field: 'brand',
            headerName: 'Marca',
            flex: 1,
            minWidth: 120,
            sortable: false,
            valueGetter: (params) =>
                params.row.equipment.map((equip) => equip.equipment_brand).join(","),
        },
        {
            field: 'type',
            headerName: 'Tipo',
            flex: 1,
            minWidth: 150,
            sortable: false,
            valueGetter: (params) =>
                params.row.equipment.map((equip) => equip.equipment_type).join(","),
        },
        {
            field: "is_at_office",
            headerName: "Local",
            flex: 1,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                if (params.row.equipment.map((equip) => equip.is_at_office).join(",") === "true") {
                    return params.row.equipment.map((equip) => equip.sector).join(",");
                } else if (params.row.equipment.map((equip) => equip.is_at_office).join(",") === "false") {
                    return "Fora do escritório";
                }
            },
        },

    ]


    if (availability) {
        let newColumns = [
            {
                field: "change_location",
                headerName: "Mudar Localização",
                flex: 1,
                minWidth: 200,
                align: 'center',
                sortable: false,
                renderCell: (params) => {
                    if (params.row.equipment.map((equip) => equip.is_at_office).join(",") === "true") {
                        return (<>
                            <Button
                                sx={{display: "flex", color: "blue"}}
                                onClick={() =>
                                    toastConfirmation({
                                        item: "Mudar localizacao do equipamento",
                                        handleClick: () => handleClickLocalizacao(params.row, "home"),
                                    })
                                }
                            >
                                <BusinessIcon/>
                            </Button>
                        </>);
                    } else if (params.row.equipment.map((equip) => equip.is_at_office).join(",") === "false") {
                        return (<>
                            <Button
                                sx={{display: "flex", color: "blue"}}
                                onClick={() =>
                                    toastConfirmation({
                                        item: "Mudar localizacao do equipamento",
                                        handleClick: () => handleClickLocalizacao(params.row, "office"),
                                    })
                                }
                            >
                                <HomeIcon/>
                            </Button>
                        </>);
                    }
                },

            },
            {
                field: "return_equipment",
                headerName: "Devolver Equipamento",
                flex: 1,
                minWidth: 200,
                align: 'center',
                renderCell: (params) => (
                    <>
                        <Button
                            sx={{display: "flex", color: "blue"}}
                            onClick={() =>
                                toastConfirmation({
                                    item: "Devolver Equipamento",
                                    handleClick: () => handleClickDevolver(params.row),
                                })
                            }
                        >
                            <UndoIcon/>
                        </Button>
                    </>
                ),
            },
        ]
        columns.push(...newColumns);
    } else if (!availability) {
        let newColumns = [
            {
                field: "created_at",
                headerName: "Criado em",
                flex: 1,
                valueFormatter: (params) => {
                    const date = new Date(params.value);
                    return date.toLocaleString("pt-BR");
                },
            },
            {
                field: "returned_at",
                headerName: "Data de Devolução",
                flex: 1,
                valueFormatter: (params) => {
                    if (params.value === null) {
                        return "Em uso";
                    }
                    const date = new Date(params.value);
                    return date.toLocaleString("pt-BR");
                },
            },
        ];
        columns.push(...newColumns);
    }

    return columns;


}
