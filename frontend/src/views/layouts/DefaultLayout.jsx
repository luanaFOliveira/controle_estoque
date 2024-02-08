import React, {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Copyright from "../../components/shared/Copyright";
import CustomDrawer from "../../components/Layout/Drawer";
import CustomAppBar from "../../components/Layout/AppToolbar";
import {useStateContext} from "../../context/GlobalContext";
import {useTheme} from "../../context/ThemeProvider";
import axiosClient from "../../axios-client";

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#284670",
        },
    },
});

export default function DefaultLayout() {
    const {token, user, setUser} = useStateContext();
    const {themeMode} = useTheme();
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/user/")
            .then(({data}) => {
                setUser(data);
            })
            .catch((error) => {
                alert("Usuário não autorizado, realize o login para continuar.");
            })
            .finally(() => {
                setLoading(false);
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
            mode: "dark",
        },
    });

    return (
        <ThemeProvider theme={themeMode === "light" ? defaultTheme : darkTheme}>
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <CustomAppBar open={open} toggleDrawer={toggleDrawer}/>
                <CustomDrawer
                    open={open}
                    toggleDrawer={toggleDrawer}
                    is_admin={user.is_admin}
                    loading={loading}
                />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        minHeight: '100vh',
                        m: 0,
                        p: 0
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4}}>
                        <Grid container spacing={3}>
                            <Outlet/>
                        </Grid>
                    </Container>
                    <Box mt={5}>
                        <Copyright sx={{p: 4}}/>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
