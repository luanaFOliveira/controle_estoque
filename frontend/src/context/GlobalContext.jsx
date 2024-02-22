import {createContext, useContext, useState} from 'react';
import {ThemeProvider} from './ThemeProvider';

const StateContext = createContext({});

export function GlobalContext({children}) {
    const [sector, _setSector] = useState(localStorage.getItem('sector'));
    const setSector = (sector) => {
        _setSector(sector);
        if (sector) {
            localStorage.setItem('sector', JSON.stringify(sector));
        } else {
            localStorage.removeItem('sector');
        }
    };

    return (
        <ThemeProvider>
            <StateContext.Provider
                value={{
                    sector,
                    setSector,
                }}
            >
                {children}
            </StateContext.Provider>
        </ThemeProvider>
    );
}

export const useStateContext = () => useContext(StateContext);
