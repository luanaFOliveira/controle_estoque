import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./views/layouts/DefaultLayout";
import GuestLayout from "./views/layouts/GuestLayout";
import Login from "./views/auth/Login";
import NotFound from "./views/shared/NotFound";
import EquipmentList from "./views/Equipment/EquipmentList";
import UserForm from "./views/User/UserForm";
import SectorForm from "./views/Sector/SectorForm";
import SectorList from "./views/Sector/SectorList";
import UserList from "./views/User/UserList";
import SectorDetail from "./views/Sector/SectorDetail";
import ManageEquipment from "./views/Equipment/ManageEquipment";
import EquipmentRequestPage from "./views/EquipmentRequestPage";
import ViewEquipment from "./views/Equipment/ViewEquipment";
import MyEquipmentPage from "./views/MyEquipmentPage";

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
        element: <SectorDetail />,
      },
      {
        path: "/sectors/edit/:sectorId",
        element: <SectorForm />,
      },
      {
        path: "/sectors/new",
        element: <SectorForm />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/users/new",
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
      {
        path: '/request-equipment',
        element: <EquipmentRequestPage/>,
      },
      {
        path: '/my-equipments',
        element: <MyEquipmentsPage/>,
      }
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
