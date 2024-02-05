import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeProvider';
import { AuthProvider } from './context/AuthProvider';
import Routes from './routes/Routes';
import Login from './views/auth/Login';
import Home from './views/Home';
import BaseTable from './components/BaseTable';
import EquipmentRequestPage from './views/EquipmentRequestPage';

const router = createBrowserRouter([
  {path: '/', element: <Home/>},
  {path: '/login', element: <Login/>},
  {path: '/table', element: <EquipmentRequestPage/>},
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router}/>,
        </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
