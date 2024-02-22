import React, {useState} from 'react';
import {Box, Button, Container, TextField, Typography,} from '@mui/material';
import {useAuth} from "../../context/AuthProvider";
import {toast} from "react-toastify";
import {changePassword} from "../../services/userService";
import {useNavigate} from "react-router-dom";

const UserChangePassword = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password === formData.password_confirmation && formData.password.length > 4) {
            const res = await changePassword({password: formData.password, user_id: user.user_id});
            if (res) {
                toast.success('Senha alterada com sucesso!');
                navigate('/my-account');
            }
        } else {
            toast.error("A senha deve ter pelo menos 5 caracteres e ser idêntica à senha de confirmação.")
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" fontWeight="bold">
                    Editar minha senha
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Senha"
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirmar Senha"
                        name="password_confirmation"
                        type="password"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        Alterar senha
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default UserChangePassword;
