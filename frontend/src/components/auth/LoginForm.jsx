import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { LoginGoogle } from "./LoginGoogle";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/GlobalContext";
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export function LoginForm({ handleShowLogin, setErrorMessage, setOpenSnack }) {
  const navigate = useNavigate();
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLoginGoogle = async (googleResponse) => {
    try {
      const googleToken = googleResponse.credential;
      await axiosClient.post("/login-google", { googleToken })
        .then((response) => {
          const { user, token } = response.data;
          login(user, token);
          navigate('/home');
        })
    } catch (error) {
      if (error.response.status === 404) {
        setErrorMessage("Email não cadastrado.");
      } else {
        setErrorMessage("Login com Google falhou!");
      }
      setOpenSnack(true);
    }
  };

  const validateForm = ({ password, email }) => {
    if (!emailRegex.test(email)) {
      setErrorMessage("O email fornecido não é válido!");
      return false;
    }
    if (password.length < 5) {
      setErrorMessage("A senha deve ter pelo menos 5 caracteres!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    if (validateForm({ email: payload.email, password: payload.password })) {
      try {
        await axiosClient.post("/login", payload)
          .then((response) => {
            const { user, token } = response.data;
            login(user, token);
            navigate('/home');
          })
      } catch (error) {
        setErrorMessage("Credencias inválidas!");
        setOpenSnack(true);
      }
    } else {
      setOpenSnack(true);
    }
  };

  return (
    <Container>
      <Typography component="h1" variant="h5">
        Bem-vindo
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
        <TextField
          margin="normal"
          fullWidth
          id="password"
          label="Senha"
          name="password"
          inputRef={passwordRef}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Grid item container justifyContent="flex-end" marginTop="5px">
          <Link
            component="button"
            variant="body2"
            onClick={(event) => {
              event.preventDefault();
              handleShowLogin();
            }}
          >
            Esqueceu sua senha?
          </Link>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          ENTRAR
        </Button>
        <Divider orientation="horizontal" flexItem>
          <Typography variant="body2">ou</Typography>
        </Divider>
        <LoginGoogle handleLoginGoogle={handleLoginGoogle} />
      </Box>
    </Container>
  );
}
