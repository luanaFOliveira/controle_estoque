import React, { useState } from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { RequestEquipButtonCell } from "./CustomColumns";

export default function RequestPopOver({ row, handleSubmit }) {
  const [formValues, setFormValues] = useState({ motive: "", rowData: {} });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
    setFormValues({ motive: "", rowData: row });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <RequestEquipButtonCell onClick={handleButtonClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={2}>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                label="Equipamento a ser retirado"
                fullWidth
                value={formValues.rowData.name}
                InputProps={{ readOnly: true }}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Motivo da retirada"
                fullWidth
                multiline
                rows={2}
                value={formValues.motive}
                onChange={(e) =>
                  setFormValues({ ...formValues, motive: e.target.value })
                }
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(formValues)}
              >
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Popover>
      {open && <div className="backdrop" onClick={handleClose}></div>}
      <style>
        {`
            .backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5); /* Cor escura semitransparente */
                z-index: 999; /* Certifique-se de que a camada de fundo esteja acima de outros elementos */
            }
            `}
      </style>
    </>
  );
}
