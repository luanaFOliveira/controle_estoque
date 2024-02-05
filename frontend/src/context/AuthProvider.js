import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosClient from '../axios-client';


const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const storagedUser = localStorage.getItem('user');
        const storagedToken = localStorage.getItem('token');
    
        if (storagedToken && storagedUser) {
          setUser(JSON.parse(storagedUser));
          axiosClient.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, []);

    async function Login({ email, password}) {
        const response = await axiosClient.post('/login', {
            email: email,
            password: password,
        });
        setUser(response.data.user);
        axiosClient.defaults.headers.Authorization = `Bearer ${response.data.token}`

        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

    }

    function Logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{signed:Boolean(user),user,Login, setUser}}>
            {children}
        </AuthContext.Provider>
    );

};

export function useAuth() {
    const context = useContext(AuthContext);
  
    return context;
}

export { AuthProvider, AuthContext };