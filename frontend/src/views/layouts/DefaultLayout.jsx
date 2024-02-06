import React, {useEffect} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Copyright from "../../components/Copyright";
import CustomDrawer from "../../components/Drawer";
import CustomAppBar from "../../components/AppToolbar";
import {useStateContext} from "../../context/GlobalContext";
import {useTheme} from "../../context/ThemeProvider";
import axiosClient from "../../axios-client";

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#284670',
        },
    }, components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                    }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                    },
                },
            },
        }, MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: 'white',
                    },
                },
            },
        },
    },
})

export default function DefaultLayout() {
    const {token, user, setUser} = useStateContext();
    const {themeMode} = useTheme();
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        axiosClient.get(`/user/`).then(({data}) => {
            setUser(data)
        }).catch((error) => {
            alert("Usuário não autorizado, realize o login para continuar.")
        });
    }, []);

    if (!token) {
        return <Navigate to="/login"/>;
    }
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (<ThemeProvider theme={themeMode === 'light' ? defaultTheme : darkTheme}>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <CustomAppBar open={open} toggleDrawer={toggleDrawer}/>
            <CustomDrawer open={open} toggleDrawer={toggleDrawer} is_admin={user.is_admin}/>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={3}>
                        <Outlet/>
                    </Grid>
                    <Copyright sx={{pt: 4}}/>
                </Container>
            </Box>
        </Box>
    </ThemeProvider>);
}