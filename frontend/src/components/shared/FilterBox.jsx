import React, { useState } from 'react';
import { Autocomplete, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';

const FilterBox = ({ onSearch, onAvailabilityChange, disponibility, label }) => {
  const [searchValue, setSearchValue] = useState('');
  const [availability, setAvailability] = useState('all');

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };

  const handleAvailabilityChange = (event) => {
    const value = event.target.value;
    setAvailability(value);
    onAvailabilityChange(value);
  };

  return (
    <Grid container spacing={2} mb={2} alignItems="center" justifyContent='center'>
      <Grid item xs={6} mb={0.95}>
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
      {disponibility && <Grid item xs={6}>
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
            <MenuItem value={1}>Disponível</MenuItem>
            <MenuItem value={0}>Não Disponível</MenuItem>
          </Select>
        </FormControl>
      </Grid>}
    </Grid>
  );
};

export default FilterBox;