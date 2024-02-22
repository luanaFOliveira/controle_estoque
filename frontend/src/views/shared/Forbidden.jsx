import React from "react";
import {Link} from "react-router-dom";
import {Button, Container, Typography} from "@mui/material";
import LogoJetimob from "../../components/shared/LogoJetimob";

const Forbidden = () => {
    return (
        <Container
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
            }}
        >
            <LogoJetimob logoWidth="50px" logoHeight="50px" fontSize="45px" disableLink={true}/>
            <Typography variant="h5" align="center" color="textPrimary" gutterBottom sx={{mt: 5, mb: 2}}>
                403 - Forbidden
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Você não está autorizado a acessar essa rota.
            </Typography>
            <div style={{textAlign: "center"}}>
                <Button component={Link} to="/login" variant="contained" color="primary">
                    Voltar
                </Button>
            </div>
        </Container>
    );
};

export default Forbidden;
