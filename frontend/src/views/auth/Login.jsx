import React, {useRef, useState} from 'react';
import {
    CssBaseline, Box, Typography, Container, Snackbar, SnackbarContent
} from '@mui/material';
import Copyright from "../../components/Copyright";
import axiosClient from "../../axios-client";
import {useStateContext} from "../../context/GlobalContext";
import LogoJetimob from "../../components/LogoJetimob";
import {LoginForm} from "../../components/LoginForm";

export default function Login() {
    const {setUser, setToken} = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [showPassword, setShowPassword] = useState(false)
    const [openSnack, setOpenSnack] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

    const validateForm = ({password, email}) => {
        if (!emailRegex.test(email)) {
            setErrorMessage('O email fornecido não é válido!');
            return false;
        }
        if (password.length < 5) {
            setErrorMessage('A senha deve ter pelo menos 5 caracteres!');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            email: emailRef.current.value, password: passwordRef.current.value,
        };
        if (validateForm({email: payload.email, password: payload.password})) {
            try {
                const response = await axiosClient.post('/login', payload);
                const {user, token} = response.data;
                setUser(user);
                setToken(token);
            } catch (error) {
                setErrorMessage('Credencias inválidas!');
                setOpenSnack(true);
            }
        } else {
            setOpenSnack(true);
        }
    };

    const handleLoginGoogle = async (googleResponse) => {
        try {
            const googleToken = googleResponse.credential;
            const response = await axiosClient.post('/login-google', {googleToken});
            const {user, token} = response.data;
            setUser(user);
            setToken(token);
        } catch (error) {
            if (error.response.status == 404) {
                setErrorMessage('Email não cadastrado.');
            } else {
                setErrorMessage('Login com Google falhou!');
            }
            setOpenSnack(true);
        }
    };

    return (<Container component="main" maxWidth="xs" sx={{
        display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh'
    }}
    >
        <Box sx={{marginTop: 8}}>
            <LogoJetimob disableLink={true} logoWidth="40px" logoHeight="40px" fontSize="30px"/>
        </Box>
        <CssBaseline/>
        <LoginForm handleSubmit={handleSubmit} emailRef={emailRef} passwordRef={passwordRef}
                   showPassword={showPassword} setShowPassword={setShowPassword}
                   handleLoginGoogle={handleLoginGoogle}
        />
        <Box
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto',
            }}
        >
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Box>
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "left"}}
            open={openSnack}
            onClose={() => setOpenSnack(false)}
            autoHideDuration={5000}
        >
            <SnackbarContent
                style={{backgroundColor: '#B22222'}}
                message={errorMessage}
            />
        </Snackbar>
    </Container>);
}