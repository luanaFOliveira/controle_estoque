import React, {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";
import {useTheme} from "../../context/ThemeProvider";
import {useStateContext} from "../../context/GlobalContext";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";
import {indexSectors} from "../../services/sectorService";
import {errorToast} from "../../services/api";

const drawerWidth = 240;

const AppToolbar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const CustomAppBar = ({open, toggleDrawer, is_admin}) => {
    const navigate = useNavigate();
    const {themeMode, toggleTheme} = useTheme();
    const {logout, user, loadingUser} = useAuth();
    const {sector, setSector} = useStateContext();
    const [sectors, setSectors] = useState([]);
    const location = useLocation();
    const pathNames = {
        "/home": "Início",
        "/my-account": "Gerenciar conta",
        "/equipments": "Equipamentos",
        "/users": "Usuários",
        "/sectors": "Setores",
        "/view-sector": "Vizualizar setor",
        "/request-equipment": "Solicitar equipamento",
        "/my-equipments": "Meus equipamentos",
        "/equipment-requests": "Pedidos de retirada",
    };
    let dashboardName = pathNames[location.pathname] || "";

    useEffect(() => {
        if (!loadingUser) {
            if (user && !user.is_admin) {
                const getSectors = async () => {
                    try {
                        const response = await indexSectors({});
                        if (response) {
                            setSectors(response.data);
                        }
                    } catch (error) {
                        console.error(error);
                        errorToast(error);
                    }
                }

                getSectors();
            }
        }
    }, [loadingUser]);

    const onLogout = async (ev) => {
        ev.preventDefault();
        await logout();
        navigate("/login");
    };

    const handleSectorChange = (event) => {
        event.preventDefault();
        const newSector = event.target.value;
        setSector(newSector);
        window.location.reload();
    };

    return (
        <AppToolbar position="absolute" open={open}>
            <Toolbar sx={{pr: "24px"}}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: "36px",
                        ...(open && {display: "none"}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1, userSelect: "none"}}
                >
                    {dashboardName}
                </Typography>
                <FormControl sx={{mr: 2}}>
                    <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                            color: "white",
                            "&.Mui-focused": {
                                color: "white",
                            },
                        }}
                    >
                        Setor
                    </InputLabel>
                    {is_admin === false && (
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={sector}
                            onChange={handleSectorChange}
                            input={<OutlinedInput label="Setor"/>}
                            sx={{
                                color: "white",
                                minWidth: 150,
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                                "& .MuiSelect-icon": {
                                    color: "white",
                                },
                            }}
                        >
                            {sectors.map((sector, index) => (
                                <MenuItem key={index} value={sector.sector_id}>
                                    {sector.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </FormControl>
                <IconButton color="inherit" onClick={toggleTheme} sx={{m: 2}}>
                    {themeMode === "light" ? <Brightness4Icon/> : <Brightness7Icon/>}
                </IconButton>
                <IconButton color="inherit" onClick={onLogout}>
                    <LogoutIcon/>
                </IconButton>
            </Toolbar>
        </AppToolbar>
    );
};

export default CustomAppBar;
