import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {GlobalContext} from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalContext>
            <RouterProvider router={router} />
        </GlobalContext>
    </React.StrictMode>
);