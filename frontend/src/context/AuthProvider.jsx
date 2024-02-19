import React, {createContext, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {api} from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        setLoadingUser(true);
        await api
            .get("/user/")
            .then(({data}) => {
                setUser(data);
            })
            .catch((error) => {
                console.log(error)
                toast("Usuário não autorizado, realize o login para continuar.");
            })
            .finally(() => {
                setLoadingUser(false);
            });
    };

    const login = (userData, token) => {
        setToken(token);
        setUser(userData);
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const logout = () => {
        api.post("/logout").then(() => {
            setUser(null);
            setToken(null);
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loadingUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
