import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./views/layouts/DefaultLayout";
import GuestLayout from "./views/layouts/GuestLayout";
import Login from "./views/auth/Login";
import NotFound from "./views/shared/NotFound";
import EquipmentList from "./views/Equipment/EquipmentList";
import ManageUser from "./views/User/ManageUser";
import ManageSector from "./views/Sector/ManageSector";
import SectorList from "./views/Sector/SectorList";
import UserList from "./views/User/UserList";
import ViewSector from "./views/Sector/ViewSector";
import ManageEquipment from "./views/Equipment/ManageEquipment";
import EquipmentRequestPage from "./views/UserPages/EquipmentRequestPage";
import ViewEquipment from "./views/Equipment/ViewEquipment";
import MyEquipmentPage from "./views/UserPages/MyEquipmentsPage";
import SectorPage from "./views/UserPages/SectorPage";
import ViewUser from "./views/User/ViewUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      {
        path: "/home",
      },
      {
        path: "/sectors",
        element: <SectorList />,
      },
      {
        path: "/sectors/:sectorId",
        element: <ViewSector />,
      },
      {
        path: "/sectors/edit/:sectorId",
        element: <ManageSector />,
      },
      {
        path: "/sectors/new",
        element: <ManageSector />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/users/new",
        element: <ManageUser />,
      },
      {
        path: "/users/edit/:userId",
        element: <ManageUser />,
      },
      {
        path: "/users/:userId",
        element: <ViewUser />,
      },
      {
        path: "/equipments",
        element: <EquipmentList />,
      },
      {
        path: "/equipments/:equipment_id",
        element: <ViewEquipment />,
      },
      {
        path: "/new-equipment",
        element: <ManageEquipment />,
      },
      {
        path: "/edit-equipment/:equipment_id",
        element: <ManageEquipment />,
      },
      {
        path: "/request-equipment",
        element: <EquipmentRequestPage />,
      },

      {
        path: "/my-equipments",
        element: <MyEquipmentPage />,
      },
      {
        path: "/view-sector",
        element: <SectorPage />,
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
