import {Box, Button, Divider, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {LoginGoogle} from "./LoginGoogle";
import React from "react";

export const LoginForm = ({handleSubmit, emailRef, passwordRef, showPassword, setShowPassword, handleLoginGoogle}) => {
    return (<Box
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
                inputRef={emailRef}
                autoFocus
            />
            <TextField
                margin="normal"
                fullWidth
                id="password"
                label="Senha"
                name="password"
                inputRef={passwordRef}
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
            <Grid item container justifyContent="flex-end" marginTop="5px">
                <Link href="#" variant="body2">
                    {"Esqueceu sua senha?"}
                </Link>
            </Grid>
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
            <LoginGoogle handleLoginGoogle={handleLoginGoogle}/>
        </Box>
    </Box>);
}