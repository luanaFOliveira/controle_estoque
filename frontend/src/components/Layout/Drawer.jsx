// Drawer.jsx
import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { adminListItems, userListItems } from "./listItems";
import LogoJetimob from "../shared/LogoJetimob";
import { LinearProgress } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const CustomDrawer = ({ open, toggleDrawer, is_admin }) => {
  const matches = useMediaQuery('(max-width:600px)');

  return (
      <Drawer variant="permanent" open={open}>
        <Toolbar
            sx={{
              "&.MuiToolbar-root": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 1,
                paddingRight: 1,
              },
            }}
        >
          <LogoJetimob logoWidth="40px" logoHeight="40px" fontSize="30px" />
          <IconButton onClick={toggleDrawer} sx={{ ml: 1 }} disabled={matches}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        {is_admin === undefined ? (
            <LinearProgress />
        ) : (
            <List component="nav">{is_admin ? adminListItems : userListItems}</List>
        )}
      </Drawer>
  );
};

export default CustomDrawer;
