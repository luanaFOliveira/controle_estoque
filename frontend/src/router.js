import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./views/layouts/DefaultLayout";
import GuestLayout from "./views/layouts/GuestLayout";
import Login from "./views/auth/Login";
import NotFound from "./views/shared/NotFound";
import SectorList from "./views/Sector/SectorList";
import SectorForm from "./views/Sector/SectorForm";
import UserList from "./views/User/UserList";
import UserForm from "./views/User/UserForm";
import EquipmentList from "./views/Equipment/EquipmentList";
import ManageEquipment from "./views/Equipment/ManageEquipment";
import EquipmentRequestPage from "./views/EquipmentRequestPage";
import ViewEquipment from "./views/Equipment/ViewEquipment";

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
        path: "/addSector",
        element: <SectorForm />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/addUser",
        element: <UserForm />,
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
