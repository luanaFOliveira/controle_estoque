// Drawer.jsx
import React from 'react';
import {styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from "@mui/material/Toolbar";
import {adminListItems} from "./listItems";
import {useStateContext} from "../context/GlobalContext";
import LogoJetimob from "./LogoJetimob";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    })
);

const CustomDrawer = ({open, toggleDrawer}) => {
    const { user } = useStateContext();

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <LogoJetimob logoWidth="40px" logoHeight="40px" fontSize="30px"/>
                <IconButton onClick={toggleDrawer} sx={{ml:1}}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav" >{adminListItems}</List>
        </Drawer>
    );
};

export default CustomDrawer;