import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from './views/layouts/DefaultLayout';
import GuestLayout from './views/layouts/GuestLayout';
import Login from './views/auth/Login';
import NotFound from './views/shared/NotFound';
import Sector from './views/Sector/Sector';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/home"/>,
      },
      {
        path: '/home',
      },
      {
        path: '/sectors',
        element: <Sector/>,
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound/>,
  },
]);

export default router;
