import React from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import Copyright from "../../components/shared/Copyright";
import LogoJetimob from "../../components/shared/LogoJetimob";
import { LoginForm } from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ marginTop: 8 }}>
        <LogoJetimob
          disableLink={true}
          logoWidth="40px"
          logoHeight="40px"
          fontSize="30px"
        />
      </Box>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <LoginForm />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  );
}
