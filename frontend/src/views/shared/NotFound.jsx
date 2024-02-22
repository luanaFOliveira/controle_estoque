import React from "react";
import {Link} from "react-router-dom";
import {Box, Button, Container, Typography} from "@mui/material";
import LogoJetimob from "../../components/shared/LogoJetimob";

const NotFound = () => {
    return (
        <Container
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box marginRight={20}>
                <LogoJetimob logoWidth="50px" logoHeight="50px" fontSize="45px" disableLink={true}/>
                <Typography variant="h5" align="start" color="textPrimary" gutterBottom sx={{mt: 5, mb: 2}}>
                    404 - Not Found
                </Typography>
                <Typography variant="h5" align="start" color="textSecondary" paragraph>
                    A pagina que você esta procurando não existe.
                </Typography>
                <div>
                    <Button component={Link} to="/" variant="contained" color="primary">
                        Voltar
                    </Button>
                </div>
            </Box>
            <img src="/notFound.png" alt="Not Found" width="200"/>
        </Container>

    );
};

export default NotFound;
