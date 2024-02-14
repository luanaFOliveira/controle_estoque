import { toast } from "react-toastify";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

export const toastDelete = ({ item, handleClick }) => {
  const message = `Tem certeza que quer remover esse ${item}?`;

  toast.warn(
    <Box sx={{ color: "black" }}>
      <Typography variant="body1">{message}</Typography>
      <Grid item container justifyContent="end">
        <Button onClick={handleClick} style={{ color: "black" }}>
          Confirmar
        </Button>
      </Grid>
    </Box>,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: true,
      theme: "colored",
    },
  );
};

export const toastConfirmation = ({ item, handleClick }) => {
  toast.info(
    <Box sx={{ color: "black" }}>
      <Typography variant="body1">Confirme sua escolha:</Typography>
      <Typography variant="body1">{item}</Typography>
      <Grid item container justifyContent="end">
        <Button
          onClick={() => {
            handleClick();
          }}
          style={{ color: "black" }}
        >
          Confirmar
        </Button>
      </Grid>
    </Box>,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: true,
      theme: "colored",
    },
  );
};
