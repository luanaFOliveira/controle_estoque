import React from "react";
import { Button, Link, Tooltip, Typography } from "@mui/material";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { toastConfirmation } from "../shared/ToastComponents";
import { errorToast } from "../../services/api";
import { updateEquipmentRequest } from "../../services/equipmentRequestService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RequestTableColumns({ is_handled_table, setReload }) {
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
      field: "equipment_request_id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "user",
      headerName: "Usuário",
      width: 150,
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
      field: "equipment",
      headerName: "Equipamento",
      width: 120,
      renderCell: (params) => (
        <Link
          component="button"
          onClick={() => {
            navigate(`/equipments/${params.row.equipment.equipment_id}`);
          }}
          underline="hover"
          sx={{ cursor: "pointer" }}
        >
          {params.row.equipment.equipment_id}
        </Link>
      ),
    },
    {
      field: "request_motive",
      headerName: "Motivo da Solicitação",
      width: 200,
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
      width: 200,
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
      width: 150,
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
      width: 150,
      renderCell: (params) =>
        params.row.request_status === "Não Aprovado" ? (
          <Typography variant="body2" style={{ color: "red" }}>
            {params.row.request_status}
          </Typography>
        ) : (
          <Typography variant="body2" style={{ color: "green" }}>
            {params.row.request_status}
          </Typography>
        ),
    });
  }

  return columns;
}