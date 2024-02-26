import React, {useState} from 'react';
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import Grid from '@mui/material/Grid';
import {debounce} from 'lodash';

const FilterBox = ({onSearch, onAvailabilityChange, disponibility, disponibilityLabels, equipmentBrand, brandLabels, onBrandChange ,equipmentType, typeLabels, onTypeChange,requestMotive,onMotiveChange,motiveLabels, label}) => {
    
    const [searchValue, setSearchValue] = useState('');
    const [availability, setAvailability] = useState('all');
    const [equipment_brand, setEquipmentBrand] = useState('all');
    const [equipment_type, setEquipmentType] = useState('all');
    const [request_motive, setRequestMotive] = useState('all');


    const handleSearchChange = debounce((event) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        onSearch(newValue);
    }, 300);

    const handleAvailabilityChange = (event) => {
        const value = event.target.value;
        setAvailability(value);
        onAvailabilityChange(value);
    };

    const handleBrandChange = (event) => {
        const value = event.target.value;
        setEquipmentBrand(value);
        onBrandChange(value);
    };

    const handleTypeChange = (event) => {
        const value = event.target.value;
        setEquipmentType(value);
        onTypeChange(value);
    };

    const handleMotiveChange = (event) => {
        const value = event.target.value;
        setRequestMotive(value);
        onMotiveChange(value);
    };

    let selectSize = 12;
    if (disponibility && !equipmentBrand && !equipmentType && !requestMotive) {
        selectSize = 12;
    } else if (disponibility && equipmentBrand && !equipmentType) {
        selectSize = 6;
    }else if (disponibility && !equipmentBrand && equipmentType) {
        selectSize = 6;
    }else if (disponibility && equipmentBrand && equipmentType) {
        selectSize = 4;
    }else if(disponibility && requestMotive){
        selectSize = 6;
    }else if(!disponibility && equipmentBrand && equipmentType){
        selectSize = 6;
    }

    return (
        <Grid container spacing={2} mb={2} alignItems="center" justifyContent='center'>
            <Grid item xs={12} mb={0.95}>
                <Autocomplete
                    freeSolo
                    options={[]}
                    value={searchValue}
                    onChange={handleSearchChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin='normal'
                            fullWidth
                            label={label}
                            onChange={handleSearchChange}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </Grid>
            {disponibility && <>
            <Grid item xs={selectSize}>
                <FormControl fullWidth>
                    <InputLabel id="availability-select-label">Disponibilidade</InputLabel>
                    <Select
                        labelId="availability-select-label"
                        id="availability-select"
                        label="Disponibilidade"
                        value={availability}
                        onChange={handleAvailabilityChange}
                    >
                        <MenuItem value="all">Todos</MenuItem>
                        {disponibilityLabels.map((label, index) => (
                            <MenuItem key={index} value={index}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            </>}
            {equipmentBrand && <>
            <Grid item xs={selectSize}>
                <FormControl fullWidth>
                    <InputLabel id="brand-select-label">Marca</InputLabel>
                    <Select
                        labelId="brand-select-label"
                        id="brand-select"
                        label="Marca"
                        value={equipment_brand}
                        onChange={handleBrandChange}
                    >
                        <MenuItem value="all">Todos</MenuItem>
                        {brandLabels.map((label, index) => (
                            <MenuItem key={index} value={label}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            </>}
            {equipmentType &&<>
            <Grid item xs={selectSize}>
                <FormControl fullWidth>
                    <InputLabel id="type-select-label">Tipo</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        label="Tipo"
                        value={equipment_type}
                        onChange={handleTypeChange}
                    >
                        <MenuItem value="all">Todos</MenuItem>
                        {typeLabels.map((label, index) => (
                            <MenuItem key={index} value={label}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            </>}
            {requestMotive && <>
            <Grid item xs={selectSize}>
                <FormControl fullWidth>
                    <InputLabel id="motive-select-label">Motivo</InputLabel>
                    <Select
                        labelId="motive-select-label"
                        id="motive-select"
                        label="Motivo"
                        value={request_motive}
                        onChange={handleMotiveChange}
                    >
                        <MenuItem value="all">Todos</MenuItem>
                        {motiveLabels.map((label, index) => (
                            <MenuItem key={index} value={label}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            </>}
            
        </Grid>
    );
};

export default FilterBox;
