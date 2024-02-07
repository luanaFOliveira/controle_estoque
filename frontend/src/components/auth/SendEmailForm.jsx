import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";

export const SendEmailForm = ({
  handleShowLogin,
  setErrorMessage,
  setOpenSnack,
}) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const emailRef = useRef();
  const initialCountdown = localStorage.getItem("countdown") || 5 * 60;
  const [isButtonDisabled, setButtonDisabled] = useState(
    initialCountdown < 5 * 60,
  );
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    let intervalId;

    if (isButtonDisabled && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
        localStorage.setItem("countdown", countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setButtonDisabled(false);
      localStorage.removeItem("countdown");
    }

    return () => clearInterval(intervalId);
  }, [isButtonDisabled, countdown]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    if (emailRegex.test(email)) {
      setButtonDisabled(true);
      try {
        await axiosClient.post("/send-email", { email });
      } catch (error) {
        if (error.response?.status === 404) {
          setErrorMessage("Email não cadastrado.");
        } else {
          setErrorMessage("Erro ao tentar enviar o email!");
        }
      }
    } else {
      setErrorMessage("O email fornecido não é válido!");
      setOpenSnack(true);
    }
  };

  return (
    <Container>
      <Typography component="h1" variant="h5">
        Recuperação de senha
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          name="email"
          inputRef={emailRef}
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isButtonDisabled}
          sx={{ mt: 3, mb: 2 }}
        >
          Enviar senha por email
        </Button>
        {isButtonDisabled && (
          <Typography variant="body2">
            Aguarde {Math.floor(countdown / 60)} minutos e {countdown % 60}{" "}
            segundos para poder reenviar o email. Agradecemos a paciência 😊
          </Typography>
        )}
        <Grid item container justifyContent="flex-end" marginTop="10px">
          <Link
            component="button"
            variant="body2"
            onClick={(event) => {
              event.preventDefault();
              handleShowLogin();
            }}
          >
            Voltar
          </Link>
        </Grid>
      </Box>
    </Container>
  );
};
