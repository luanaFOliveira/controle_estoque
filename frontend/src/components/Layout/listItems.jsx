import * as React from 'react';
import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import {Link} from "react-router-dom";

const ListItemLink = ({to, icon: Icon, primary}) => (
    <ListItemButton component={Link} to={to}>
        <ListItemIcon>
            <Icon/>
        </ListItemIcon>
        <ListItemText primary={primary}/>
    </ListItemButton>
);

export const userListItems = (
    <React.Fragment>
        <ListItemLink to="/view-sector" icon={VisibilityIcon} primary="Visualizar setor"/>
        <ListItemLink to="/request-equipment" icon={AddCircleIcon} primary="Solicitar Equipamento"/>
        <ListItemLink to="/my-equipments" icon={DevicesIcon} primary="Meus equipamentos"/>
    </React.Fragment>
);

export const adminListItems = (
    <React.Fragment>
        <ListItemLink to="/sectors" icon={BusinessIcon} primary="Setores"/>
        <ListItemLink to="/users" icon={PeopleAltIcon} primary="Usuários"/>
        <ListItemLink to="/equipments" icon={DevicesIcon} primary="Equipamentos"/>
        <ListItemLink to="/withdrawal-requests" icon={AssignmentReturnIcon} primary="Pedidos de Retirada"/>
    </React.Fragment>
);
