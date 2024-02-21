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
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { logIn, logInWithGoogle } from "../../services/authService";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLoginGoogle = async (googleResponse) => {
    try {
      const response = await logInWithGoogle(googleResponse);
      if (response.token && response.user) {
        const token = response.token;
        const user = response.user;
        login(user, token);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };
    try {
      const response = await logIn(payload);
      if (response.token && response.user) {
        const token = response.token;
        const user = response.user;
        login(user, token);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
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
          inputProps={{
            minLength: 5,
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
