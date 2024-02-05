// Drawer.jsx
import React from 'react';
import {styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from "@mui/material/Toolbar";
import {userListItems, adminListItems} from "./listItems";
import Typography from "@mui/material/Typography";
import {GlobalContext, useStateContext} from "../context/GlobalContext";
import {Box} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

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
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{
                        width: 38,
                        height: 38,
                        backgroundColor: '#284670',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <HomeRoundedIcon sx={{color: 'white'}}/>
                    </Box>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            ml: 2, fontWeight: 'bold', color: '#284670', userSelect: 'none'
                        }}
                    >
                        Jetimob
                    </Typography>
                </Box>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav" >{adminListItems}</List>
        </Drawer>
    );
};

export default CustomDrawer;