import {createContext, useContext, useState} from "react";
import {ThemeProvider} from "./ThemeProvider";

const StateContext = createContext({

})

export const GlobalContext = ({children}) => {
    const [user, _setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setUser = (user) => {
      _setUser(user);
      if(user){
          localStorage.setItem('user', JSON.stringify(user));
      } else {
          localStorage.removeItem('user');
      }
    };


    return (
        <ThemeProvider>
            <StateContext.Provider value={{
                user,
                token,
                setUser,
                setToken,
            }}>
                {children}
            </StateContext.Provider>
        </ThemeProvider>
    )
}

export const useStateContext = () => useContext(StateContext);