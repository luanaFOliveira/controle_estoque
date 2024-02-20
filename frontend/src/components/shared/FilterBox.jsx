import React, { useState } from 'react';
import { Autocomplete, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';

const FilterBox = ({ onSearch, onAvailabilityChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [availability, setAvailability] = useState('all');

  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleAvailabilityChange = (event) => {
    const value = event.target.value;
    setAvailability(value);
    onAvailabilityChange(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  return (
    <Grid container spacing={2} mb={2} alignItems="center">
      <Grid item xs={6}>
        <Autocomplete
          id="searchBox"
          freeSolo
          options={[]}
          value={searchValue}
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Equipment Code"
              onKeyPress={handleKeyPress}
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="availability-select-label">Disponibilidade</InputLabel>
          <Select
            labelId="availability-select-label"
            id="availability-select"
            value={availability}
            onChange={handleAvailabilityChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={1}>Disponível</MenuItem>
            <MenuItem value={0}>Não Disponível</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FilterBox;
