import React from 'react';
import {Box, Button, Card, CardContent, CircularProgress, Container, Typography,} from '@mui/material';
import {useAuth} from "../../context/AuthProvider";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";

const MyAccount = () => {
    const navigate = useNavigate();
    const {user, loadingUser} = useAuth();

    const UserCard = ({label, value}) => {
        return (<Card sx={{mb: 2, maxWidth: "700px", minWidth: "400px"}}>
            <CardContent>
                <Grid container>
                    <Typography variant="body2" width="140px">
                        {label}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {value}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>);
    };

    return (<Container component="main" maxWidth="xs">
        {loadingUser ? (<Grid item container justifyContent="center">
            <CircularProgress/>
        </Grid>) : (<Box
            sx={{
                marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5" fontWeight="bold">
                Minha conta
            </Typography>
            <Box sx={{mt: 3, justifyContent: "start"}}>
                <UserCard value={user.name} label="Nome:"/>
                <UserCard value={user.email} label="Email:"/>
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
            </Box>
        </Box>)}
    </Container>);
};

export default MyAccount;
