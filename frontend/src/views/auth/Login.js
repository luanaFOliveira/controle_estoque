import React ,{ useContext,useState }from 'react';
import {useAuth } from '../../context/AuthProvider';
import { ThemeContext } from '../../context/ThemeProvider';
import ToggleTheme from '../../components/ToggleTheme';

export default function Login(){
    const { theme } = useContext(ThemeContext);

    const {signed,Login} = useAuth();
    console.log(signed);

    const [credentials,setCredentials] = useState({
        email:'',
        password:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [name]: value,
        }));
    };

    async function handleSubmit(){
        
        await Login({
            email:credentials.email,
            password:credentials.password,
        });
        
    }

    return(
        <div style={{backgroundColor:theme.background,color:theme.text}}>
            <h1>Login</h1>
            <ToggleTheme/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div>
                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );

};