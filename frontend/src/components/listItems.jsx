import * as React from 'react';
import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

export const userListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <VisibilityIcon/>
            </ListItemIcon>
            <ListItemText primary="Visualizar setor"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AddCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="Solicitar Equipamento"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <DevicesIcon/>
            </ListItemIcon>
            <ListItemText primary="Meus equipamentos"/>
        </ListItemButton>
    </React.Fragment>
);

export const adminListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <BusinessIcon/>
            </ListItemIcon>
            <ListItemText primary="Setores"/>
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <PeopleAltIcon/>
            </ListItemIcon>
            <ListItemText primary="Usuários"/>
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <DevicesIcon/>
            </ListItemIcon>
            <ListItemText primary="Equipamentos"/>
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <AssignmentReturnIcon/>
            </ListItemIcon>
            <ListItemText primary="Pedidos de Retirada"/>
        </ListItemButton>

    </React.Fragment>
);
