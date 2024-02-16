import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./views/layouts/DefaultLayout";
import GuestLayout from "./views/layouts/GuestLayout";
import Login from "./views/auth/Login";
import NotFound from "./views/shared/NotFound";
import EquipmentList from "./views/AdminPages/Equipment/EquipmentList";
import ManageUser from "./views/AdminPages/User/ManageUser";
import ManageSector from "./views/AdminPages/Sector/ManageSector";
import SectorList from "./views/AdminPages/Sector/SectorList";
import UserList from "./views/AdminPages/User/UserList";
import ViewSector from "./views/AdminPages/Sector/ViewSector";
import ManageEquipment from "./views/AdminPages/Equipment/ManageEquipment";
import EquipmentRequestPage from "./views/UserPages/EquipmentRequestPage";
import ViewEquipment from "./views/AdminPages/Equipment/ViewEquipment";
import MyEquipmentPage from "./views/UserPages/MyEquipmentsPage";
import SectorPage from "./views/UserPages/SectorPage";
import ViewUser from "./views/AdminPages/User/ViewUser";
import { useAuth } from "./context/AuthProvider";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import EquipmentRequests from "./views/AdminPages/equipmentRequests/EquipmentRequests";
import Forbidden from './views/shared/Forbidden';
import { toast } from 'react-toastify';

const PrivateRoute = ({ element, adminOnly, isHomePage }) => {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return (
      <Grid item container justifyContent="center" marginTop={2}>
        <CircularProgress />
      </Grid>
    );
  }

  if(!user){
    toast.warning('Usuário não autenticado, faça login para continuar')
    return <Navigate to='/login'/>;
  } else if (adminOnly && !user?.is_admin) {
    return <Navigate to="/forbidden" />;
  }

  if (isHomePage) {
    return user?.is_admin ? <SectorList /> : <SectorPage />;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      {
        path: "/home",
        element: <PrivateRoute element={<div />} adminOnly={false} isHomePage={true} />,
      },
      {
        path: "/sectors",
        element: <PrivateRoute element={<SectorList />} adminOnly={true} />,
      },
      {
        path: "/equipment-requests",
        element: (
          <PrivateRoute element={<EquipmentRequests />} adminOnly={true} />
        ),
      },
      {
        path: "/sectors/:sectorId",
        element: <PrivateRoute element={<ViewSector />} adminOnly={true} />,
      },
      {
        path: "/sectors/edit/:sectorId",
        element: <PrivateRoute element={<ManageSector />} adminOnly={true} />,
      },
      {
        path: "/sectors/new",
        element: <PrivateRoute element={<ManageSector />} adminOnly={true} />,
      },
      {
        path: "/users",
        element: <PrivateRoute element={<UserList />} adminOnly={true} />,
      },
      {
        path: "/users/new",
        element: <PrivateRoute element={<ManageUser />} adminOnly={true} />,
      },
      {
        path: "/users/edit/:userId",
        element: <PrivateRoute element={<ManageUser />} adminOnly={true} />,
      },
      {
        path: "/users/:userId",
        element: <PrivateRoute element={<ViewUser />} adminOnly={true} />,
      },
      {
        path: "/equipments",
        element: <PrivateRoute element={<EquipmentList />} adminOnly={true} />,
      },
      {
        path: "/equipments/:equipment_id",
        element: <PrivateRoute element={<ViewEquipment />} adminOnly={true} />,
      },
      {
        path: "/new-equipment",
        element: (
          <PrivateRoute element={<ManageEquipment />} adminOnly={true} />
        ),
      },
      {
        path: "/edit-equipment/:equipment_id",
        element: (
          <PrivateRoute element={<ManageEquipment />} adminOnly={true} />
        ),
      },
      {
        path: "/request-equipment",
        element: (
          <PrivateRoute element={<EquipmentRequestPage />} adminOnly={false} />
        ),
      },
      {
        path: "/my-equipments",
        element: (
          <PrivateRoute element={<MyEquipmentPage />} adminOnly={false} />
        ),
      },
      {
        path: "/view-sector",
        element: <PrivateRoute element={<SectorPage />} adminOnly={false} />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
