import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export const UpsertEquipment = ({
                                    params,
                                    handleChange,
                                    editLoading,
                                    formData,
                                    equipmentBrands,
                                    handleBrandChange,
                                    equipmentTypes,
                                    handleTypeChange,
                                    sectors,
                                    handleSubmit
                                }) => {
    const matches = useMediaQuery('(max-width:500px)');

    return (<Box
        sx={{
            marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center",
        }}
    >
        <Typography component="h1" variant="h5" fontWeight="bold">
            {params.equipment_id ? "Editar Equipamento" : "Registrar novo equipamento"}
        </Typography>
        {!editLoading ? (<Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
            <TextField
                required
                fullWidth
                label="Nome:"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                name="name"
            />
            <Autocomplete
                freeSolo
                disablePortal
                options={equipmentBrands}
                value={formData.equipment_brand}
                onInputChange={handleBrandChange}
                renderInput={(params) => (<TextField
                    {...params}
                    margin="normal"
                    required
                    fullWidth
                    label="Marca do equipamento:"
                    name="equipment_brand"
                />)}
            />
            <Autocomplete
                freeSolo
                disablePortal
                value={formData.equipment_type}
                onInputChange={handleTypeChange}
                options={equipmentTypes}
                renderInput={(params) => (<TextField
                    {...params}
                    margin="normal"
                    required
                    fullWidth
                    label="Tipo do equipamento:"
                    name="equipment_type"
                />)}
            />
            <InputLabel id="sector-select-label">Setor: *</InputLabel>
            <FormControl fullWidth>
                <Select
                    labelId="sector-select-label"
                    id="sector-select"
                    value={formData.sector}
                    onChange={handleChange}
                    name="sector"
                    sx={{width: !matches ? "calc(100vw - 50px)" : "calc(100vw - 100px)", maxWidth: "400px"}}
                >
                    {sectors.map((sector) => (<MenuItem key={sector.name} value={sector.name}>
                        {sector.name}
                    </MenuItem>))}
                </Select>
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3, mb: 2,
                }}
            >
                {params.equipment_id ? "Atualizar Equipamento" : "Registrar equipamento"}
            </Button>
        </Box>) : (<Grid item container justifyContent="center" sx={{m: 10}}>
            <CircularProgress/>
        </Grid>)}
    </Box>);
}