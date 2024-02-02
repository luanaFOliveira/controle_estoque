import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from '../views/Home';

export default function SystemRoutes(){

    return (
    <Routes>
        <Route path="/" component={Home} />
    </Routes>
    );
};
   
