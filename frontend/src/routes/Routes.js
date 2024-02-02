import React from 'react';
import {useAuth} from '../context/AuthProvider';
import SignRoutes from './SignRoutes';
import SystemRoutes from './SystemRoutes';

export default function Routes() {
    
    const {signed} = useAuth();

    return signed ? <SystemRoutes/> : <SignRoutes/>;
    
};

