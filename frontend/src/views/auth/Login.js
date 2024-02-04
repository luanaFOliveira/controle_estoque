import React, {useState} from 'react';
import {
    Button, CssBaseline, TextField, Link, Box, Typography, Container, IconButton, InputAdornment, Snackbar, Divider
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

function Copyright(props) {
    return (<Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'© '}
        {new Date().getFullYear()}{' '}
        <Link color="inherit" href="" underline="none">
            Jetimob
        </Link>
        {' - Todos os direitos reservados.'}
    </Typography>);
}

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [openSnack, setOpenSnack] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

    const validateForm = ({password, email}) => {
        if (!emailRegex.test(email)) {
            setErrorMessage('O email fornecido não é válido!');
            return false;
        }
        if (password.length < 6) {
            setErrorMessage('A senha deve ter pelo menos 6 caracteres!');
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (validateForm({email: data.get('email'), password: data.get('password')})) {
            try {
                console.log({
                    email: data.get('email'), password: data.get('password'),
                });
            } catch (error) {
                setErrorMessage('Credencias inválidas!');
                setOpenSnack(true);
                console.log(error);
            }
        } else {
            setOpenSnack(true);
        }
    };

    return (<Container component="main" maxWidth="xs" sx={{
        display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh'
    }}
    >
        <Box sx={{display: 'flex', alignItems: 'center', marginTop: 8}}>
            <Box sx={{
                width: 38,
                height: 38,
                backgroundColor: '#284670',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <HomeRoundedIcon sx={{color: 'white'}}/>
            </Box>
            <Typography
                component="h1"
                variant="h5"
                sx={{
                    ml: 2, fontWeight: 'bold', color: '#284670', userSelect: 'none'
                }}
            >
                Jetimob
            </Typography>
        </Box>
        <CssBaseline/>
        <Box
            sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 3,
                borderRadius: '15px',
                padding: '20px'
            }}
        >
            <Typography component="h1" variant="h5">
                Bem-vindo
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Senha"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                    setShowPassword(!showPassword)
                                }}
                            >
                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>),
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    ENTRAR
                </Button>
                <Divider orientation="horizontal" flexItem>
                    <Typography variant="body2">ou</Typography>
                </Divider>
                <Box sx={{marginTop: 1.5, display: 'flex', justifyContent: 'center'}}>
                    <GoogleOAuthProvider
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                        <GoogleLogin onSuccess={() => {
                        }}/>
                    </GoogleOAuthProvider>
                </Box>
            </Box>
        </Box>
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
            message={errorMessage}
            autoHideDuration={5000}
        />
    </Container>);
}