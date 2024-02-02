import React ,{ useContext }from 'react';
import { useAuth } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider';
import ToggleTheme from '../components/ToggleTheme';


export default function Home() {
    const { theme } = useContext(ThemeContext);

    const { signed, Logout } = useAuth();

    console.log(signed);

    async function handleLogout() {
        Logout();
    }

    return (
    <div style={{backgroundColor:theme.background,color:theme.text}}>
        <h1>Home</h1>
        <ToggleTheme/>
        <button onClick={handleLogout}>Logout</button>
    </div>
    );
};

