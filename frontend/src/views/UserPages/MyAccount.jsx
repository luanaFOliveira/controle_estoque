import React from 'react';
import {Box, Button, Card, CardContent, CircularProgress, Container, Typography,} from '@mui/material';
import {useAuth} from "../../context/AuthProvider";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import {ViewCard} from "../../components/shared/ViewCard";

const MyAccount = () => {
    const navigate = useNavigate();
    const {user, loadingUser} = useAuth();

    return (
        <Container component="main" >
            {loadingUser ? (
                <Grid item container justifyContent="center">
                    <CircularProgress/>
                </Grid>) : (
                <Grid
                    sx={{
                        marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: "center"
                    }}
                >
                    <Typography component="h1" variant="h5" fontWeight="bold">
                        Minha conta
                    </Typography>
                    <Grid sx={{mt: 3, maxWidth: "400px"}}>
                        <ViewCard value={user.name} label="Nome" width="100px"/>
                        <ViewCard value={user.email} label="Email" width="100px"/>
                        <Button
                            variant="contained"
                            justifyContent="end"
                            fullWidth
                            onClick={() => {
                                navigate('/edit-password');
                            }}
                            sx={{
                                mt: 3, mb: 2
                            }}
                        >
                            Alterar senha
                        </Button>
                    </Grid>
                </Grid>)}
        </Container>
    );
};

export default MyAccount;
