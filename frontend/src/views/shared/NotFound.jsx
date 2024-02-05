import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Typography, Button, Box} from '@mui/material';
import LogoJetimob from "../../components/LogoJetimob";

const NotFound = () => {
    return (
        <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <LogoJetimob logoWidth="60px" logoHeight="60px" fontSize="h2"/>
            <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
                404 - Not Found
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                A pagina que você esta procurando não existe.
            </Typography>
            <div style={{ textAlign: 'center' }}>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Voltar
                </Button>
            </div>
        </Container>
    );
};

export default NotFound;