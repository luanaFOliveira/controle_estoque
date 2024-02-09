import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginGoogle } from "./LoginGoogle";
import React, { useState } from "react";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginGoogle = async (googleResponse) => {
    const googleToken = googleResponse.credential;
    await axiosClient
      .post("/login-google", { googleToken })
      .then((response) => {
        const { user, token } = response.data;
        login(user, token);
        navigate("/home");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast("Email não cadastrado.");
        } else {
          toast("Login com Google falhou!");
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };
    if (payload.password.length > 4) {
      await axiosClient
        .post("/login", payload)
        .then((response) => {
          const { user, token } = response.data;
          login(user, token);
          navigate("/home");
        })
        .catch((error) => {
          toast(`Erro ao tentar logar: ${error.message}`);
        });
    } else {
      toast("A senha deve conter no mínimo 5 caracteres!");
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
          label="Email"
          type="email"
          name="email"
          required
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          label="Senha"
          name="password"
          required
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
};
