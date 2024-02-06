// AppToolbar.js
import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import {
    Toolbar, IconButton, Typography, Select, FormControl, InputLabel, MenuItem, OutlinedInput
} from '@mui/material';
import {
    Menu as MenuIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Logout as LogoutIcon
} from '@mui/icons-material';
import {useTheme} from "../../context/ThemeProvider";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../context/GlobalContext";
import {useLocation} from "react-router-dom";

const drawerWidth = 240;

const AppToolbar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const CustomAppBar = ({open, toggleDrawer}) => {
    const {themeMode, toggleTheme} = useTheme();
    const {setToken, setUser} = useStateContext();
    const [sector, setSector] = useState();
    const [sectors, setSectors] = useState([]);
    const location = useLocation();
    const pathNames = {
        '/home': 'Início',
    };
    let dashboardName = pathNames[location.pathname] || '';

    useEffect(() => {
        axiosClient.get(`/sectors`).then(({data}) => {
            setSectors(data.data);
        });
    }, []);

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    return (<AppToolbar position="absolute" open={open}>
        <Toolbar sx={{pr: '24px'}}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                    marginRight: '36px', ...(open && {display: 'none'}),
                }}
            >
                <MenuIcon/>
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{flexGrow: 1, userSelect: 'none'}}>
                {dashboardName}
            </Typography>
            <FormControl sx={{mr: 2}}>
                <InputLabel id="demo-simple-select-label" sx={{color: 'white'}}>Setor</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={sector}
                    onChange={(event) => setSector(event.target.value)}
                    input={<OutlinedInput label="Setor"/>}
                    sx={{color: 'white', height: '48px', minWidth: 150}}
                >
                    {sectors.map((sector) => (<MenuItem value={sector.sector_id}>{sector.name}</MenuItem>))}
                </Select>
            </FormControl>
            <IconButton color="inherit" onClick={toggleTheme} sx={{m: 2}}>
                {themeMode === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
            </IconButton>
            <IconButton color="inherit" onClick={onLogout}>
                <LogoutIcon/>
            </IconButton>
        </Toolbar>
    </AppToolbar>);
};

export default CustomAppBar;