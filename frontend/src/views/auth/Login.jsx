import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import Copyright from "../../components/shared/Copyright";
import LogoJetimob from "../../components/shared/LogoJetimob";
import { LoginForm } from "../../components/auth/LoginForm";
import { SendEmailForm } from "../../components/auth/SendEmailForm";

export default function Login() {
  const [showLogin, setShowLogin] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

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
        {showLogin ? (
          <SendEmailForm
            handleShowLogin={handleShowLogin}
            setErrorMessage={setErrorMessage}
            setOpenSnack={setOpenSnack}
          />
        ) : (
          <LoginForm
            setErrorMessage={setErrorMessage}
            setOpenSnack={setOpenSnack}
            handleShowLogin={handleShowLogin}
          />
        )}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        autoHideDuration={5000}
      >
        <SnackbarContent
          style={{ backgroundColor: "#B22222" }}
          message={errorMessage}
        />
      </Snackbar>
    </Container>
  );
}
