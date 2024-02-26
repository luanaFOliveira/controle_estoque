import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Copyright from "../../components/shared/Copyright";
import CustomDrawer from "../../components/Layout/Drawer";
import CustomAppBar from "../../components/Layout/AppToolbar";
import {useTheme} from "../../context/ThemeProvider";
import {useAuth} from "../../context/AuthProvider";
import useMediaQuery from "@mui/material/useMediaQuery";

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#284670",
        },
    },
});

export default function DefaultLayout() {
    const {user} = useAuth();
    const {themeMode} = useTheme();
    const [open, setOpen] = useState(true);
    const matches = useMediaQuery('(max-width:600px)');

    const toggleDrawer = () => {
        if (!matches) {
            setOpen(!open);
        }
    };

    useEffect(() => {
        if (matches) {
            setOpen(false);
        }
    }, [matches]);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#284670",
            },
        },
    });
    return (
        <ThemeProvider theme={themeMode === "light" ? defaultTheme : darkTheme}>
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <CustomAppBar
                    open={open}
                    toggleDrawer={toggleDrawer}
                    is_admin={user?.is_admin}
                />
                <CustomDrawer
                    open={open}
                    toggleDrawer={toggleDrawer}
                    is_admin={user?.is_admin}
                />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflowY: "scroll",
                        "&::-webkit-scrollbar": {
                            width: "0.5em",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <Toolbar/>
                    <Container
                        maxWidth="lg"
                        sx={{
                            mt: 4,
                            mb: 4,
                        }}
                    >
                        <Grid container spacing={3}>
                            <Outlet/>
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Copyright sx={{pt: 4}}/>
        </ThemeProvider>
    );
}
