import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import LogoJetimob from "../../components/shared/LogoJetimob";

const Forbidden = () => {
  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LogoJetimob logoWidth="60px" logoHeight="60px" fontSize="h2" />
      <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
        403 - Forbidden
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Você não está autorizado a acessar essa rota.
      </Typography>
      <div style={{ textAlign: "center" }}>
        <Button component={Link} to="/" variant="contained" color="primary">
          Voltar
        </Button>
      </div>
    </Container>
  );
};

export default Forbidden;
