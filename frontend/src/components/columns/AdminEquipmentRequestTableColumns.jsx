import React from "react";
import { Button, Link, Tooltip, Typography } from "@mui/material";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { toastConfirmation } from "../shared/ToastComponents";
import { errorToast } from "../../services/api";
import { updateEquipmentRequest } from "../../services/equipmentRequestService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminEquipmentRequestTableColumns({ is_handled_table, setReload }) {
  const navigate = useNavigate();

  const handleClick = async (row, action, item) => {
    try {
      const response = await updateEquipmentRequest({
        equipment_request_id: row.equipment_request_id,
        action: action,
      });
      if (response) {
        toast.success(`Solicitação ${item} com sucesso`);
        setReload((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  let columns = [
    {
      field: "user",
      headerName: "Usuário",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Link
          component="button"
          onClick={() => {
            navigate(`/users/${params.row.user.user_id}`);
          }}
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          {params.row.user.name}
        </Link>
      ),
    },
    {
      field: "equipment_code",
      headerName: "Código do equipamento",
      flex: 1,
      minWidth: 110,
      renderCell: (params) => (
        <Link
          component="button"
          onClick={() => {
            navigate(`/equipments/${params.row.equipment.equipment_id}`);
          }}
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          {params.row.equipment.equipment_code}
        </Link>
      ),
    },
    {
      field: "request_motive",
      headerName: "Motivo da Solicitação",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Tooltip title={params.row.request_motive}>
          <Typography variant="body2" noWrap>
            {params.row.request_motive}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "observation",
      headerName: "Observação",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Tooltip title={params.row.observation}>
          <Typography variant="body2" noWrap>
            {params.row.observation}
          </Typography>
        </Tooltip>
      ),
    },
  ];

  if (is_handled_table) {
    columns.push({
      field: "accept_request",
      headerName: "Aceitar / Recusar",
      headerAlign: "center",
      headerClassName: "centered-header",
      flex: 1,
      minWidth: 180,
      align: "center",
      renderCell: (params) => (
        <>
          <Button
            sx={{ display: "flex", color: "green" }}
            onClick={() =>
              toastConfirmation({
                item: "Aceitar solicitação",
                handleClick: () => handleClick(params.row, "accept", "aceita"),
              })
            }
          >
            <ThumbUpAltIcon />
          </Button>
          <Button
            sx={{ display: "flex", color: "red" }}
            onClick={() =>
              toastConfirmation({
                item: "Recusar solicitação",
                handleClick: () =>
                  handleClick(params.row, "refuse", "recusada"),
              })
            }
          >
            <ThumbDownAltIcon />
          </Button>
        </>
      ),
    });
  }

  if (!is_handled_table) {
    columns.push({
      field: "request_status",
      headerName: "Status",
      flex: 1,
      minWidth: 180,
      renderCell: (params) =>
        params.row.request_status === "Não Aprovado" ? (
          <Typography
            variant="body2"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {params.row.request_status}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            style={{ color: "green", fontWeight: "bold" }}
          >
            {params.row.request_status}
          </Typography>
        ),
    });
  }

  columns.push(
    {
      field: "created_at",
      headerName: "Criado em",
      flex: 1,
      minWidth: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString("pt-BR");
      },
    },
  )

  return columns;
}
