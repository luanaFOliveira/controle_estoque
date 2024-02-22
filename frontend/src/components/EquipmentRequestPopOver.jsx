import {Box,Popover,Button,TextField,Grid,InputLabel,Select,MenuItem} from '@mui/material';

const EquipmentRequestPopOver = ({
    anchorEl,
    open,
    handlePopoverClose,
    id,
    requestMotives,
    formData,
    setFormData,
    handleRequestSubmit,
}) => {
    return(<>
    <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
    >
        <Box p={2} component="form">
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        label="Equipamento a ser retirado"
                        fullWidth
                        value={formData.rowData.name}
                        InputProps={{ readOnly: true }}
                        sx={{ marginBottom: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="motivo">Motivo*</InputLabel>
                    <Select
                        label="Motivo"
                        fullWidth
                        value={formData.motive}
                        required
                        sx={{ marginBottom: 2 }}
                        onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                    >
                        {requestMotives.map((motive) => (
                            <MenuItem key={motive.request_motive_id} value={motive.request_motive_id}>
                                {motive.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel id="observacao">Observação</InputLabel>
                    <TextField
                        label="Adicione uma observação (opcional)"
                        fullWidth
                        multiline
                        rows={2}
                        value={formData.observation}
                        onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                        sx={{ marginBottom: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={() => handleRequestSubmit()}>
                        Confirmar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Popover>
    </>);
};
  
export default EquipmentRequestPopOver;