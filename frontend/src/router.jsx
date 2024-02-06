import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./views/layouts/DefaultLayout.jsx";
import GuestLayout from "./views/layouts/GuestLayout.jsx";
import Login from "./views/auth/Login";
import NotFound from "./views/shared/NotFound.jsx";
import EquipmentRequestPage from "./views/EquipmentRequestPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/home'/>
            },
            {
                path: '/home',
            },
            {
                path: '/solicitar-equipamento',
                element: <EquipmentRequestPage/>,
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },
])

export default router;