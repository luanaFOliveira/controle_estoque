import React from 'react';
import {  Route,Routes } from 'react-router-dom';
import Login from '../views/auth/Login';

export default function SignRoutes(){

    return (
    <Routes>
        <Route path="/login" component={Login} />
    </Routes>
    );
};
   
