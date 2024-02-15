import React from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const StatusField = ({ value }) => {
  let color;

  switch (value) {
    case "Aprovado":
      color = "green";
      break;
    case "Pendente":
      color = "#DAA520";
      break;
    case "Não Aprovado":
      color = "red";
      break;
    default:
      color = "black";
  }

  return <span style={{ color, fontWeight: "bold" }}>{value}</span>;
};


export const AvaiabilityColumn = ({ value }) => {
  let color;

  switch (value) {
    case "Disponivel":
      color = "green";
      break;
    case "Nao disponivel":
      color = "red";
      break;
    default:
      color = "black";
  }

  return <span style={{ color, fontWeight: "bold" }}>{value}</span>;
};

export const RequestEquipButtonCell = ({ onClick }) => (
  <IconButton aria-label="solicitar" onClick={onClick}>
    <AddCircleIcon />
  </IconButton>
);
