import React, {createContext, useContext, useState} from "react";
import {ThemeProvider} from "./ThemeProvider";
import {Navigate} from "react-router-dom";

const StateContext = createContext({});

export function GlobalContext({ children }) {
  const [user, _setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [sector, _setSector] = useState(localStorage.getItem('sector'));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
            return <Navigate to="/login"/>;
        }
    };

    const setUser = (user) => {
        _setUser(user);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
            return <Navigate to="/login"/>;
        }
    };

    const setSector = (sector) => {
        _setSector(sector);
        if(sector){
            localStorage.setItem('sector', JSON.stringify(sector));
        } else {
            localStorage.removeItem('sector');
      }
    };

  return (
    <ThemeProvider>
      <StateContext.Provider
        value={{
          user,
          token,
          sector,
          setUser,
          setToken,
          setSector,
        }}
      >
        {children}
      </StateContext.Provider>
    </ThemeProvider>
  );
}

export const useStateContext = () => useContext(StateContext);
