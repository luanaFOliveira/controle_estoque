import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import Grid from '@mui/material/Grid';
import {createUser, updateUser} from '../../../services/userService';
import {api} from "../../../services/api";

const ManageUser = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sectors, setSectors] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_admin: false,
        sectors: [],
    });

    useEffect(() => {
        if (userId) {
            setEditing(true);
        }
    }, [userId]);

    useEffect(() => {
        getAllSectors();
        if (userId) {
            setLoading(true);
            api
                .get(`/users/${userId}`)
                .then((data) => {
                    const updatedFormData = {
                        ...formData,
                        ...data.data.data,
                        sectors: data.data.data.sectors.map((sector) => sector.name),
                    };
                    setFormData(updatedFormData);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [userId]);

    const getAllSectors = () => {
        api.get('/sector-names')
            .then((data) => {
                setSectors(data.data);
            });
    };

    const handleSelectChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            sectors: event.target.value,
        }));
    };

    const handleChange = (e) => {
        const {
            name,
            value,
            checked
        } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: e.target.type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = formData.name.trim();
        if (trimmedName.length < 4 || trimmedName.length > 30) {
            toast.error("O nome do usuário deve ter entre 4 e 30 caracteres.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Endereço de email inválido.");
            return;
        }

        if ((formData.password.length > 0 || formData.password_confirmation.length > 0) &&
            (formData.password.length < 5 || formData.password !== formData.password_confirmation)) {
            toast.error("Por favor insira uma senha válida (pelo menos 5 caracteres) e que a confirmação de senha coincida.");
            return;
        }

        if (userId) {
            const res = await updateUser(userId, {
                ...formData,
                sectors: formData.sectors,
            })
            if (res) {
                toast.success('Usuário atualizado com sucesso!');
                navigate(`/users/${res.data.user_id}`);
            }
        } else {
            const res = await createUser({
                ...formData,
                sectors: formData.sectors
            })
            if (res) {
                toast.success('Usuário criado com sucesso!');
                navigate(`/users/${res.user.user_id}`);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            {loading ? (
                <Grid item container justifyContent="center" sx={{mt: 3}}>
                    <CircularProgress/>
                </Grid>
            ) : (
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" fontWeight="bold">
                        {userId ? 'Editar usuário' : 'Criar novo usuário'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Nome"
                            name="name"
                            sx={{maxWidth: "400px"}}
                            autoFocus
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            sx={{maxWidth: "400px"}}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required={!editing}
                            label={userId ? 'Senha (opcional)' : 'Senha'}
                            name="password"
                            sx={{maxWidth: "400px"}}
                            type="password"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required={!editing}
                            label={userId ? 'Confirmar senha (opcional)' : 'Confirmar senha'}
                            name="password_confirmation"
                            type="password"
                            sx={{maxWidth: "400px"}}
                            onChange={handleChange}
                        />
                        <InputLabel id="sector-select-label">Setores</InputLabel>
                        <Select
                            labelId="sector-select-label"
                            required
                            id="sector-select"
                            multiple
                            value={formData.sectors}
                            onChange={handleSelectChange}
                            fullWidth
                            sx={{maxWidth: "400px", width: "calc(100vw - 100px)"}}
                        >
                            {sectors.map((sector) => (
                                <MenuItem key={sector} value={sector}>
                                    {sector}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.is_admin}
                                    onChange={handleChange}
                                    name="is_admin"
                                    color="primary"
                                />
                            }
                            label="Administrador"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
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
                            {userId ? 'Editar usuário' : 'Criar usuário'}
                        </Button>
                    </Box>
                </Box>)}
        </Container>
    );
};

export default ManageUser;
