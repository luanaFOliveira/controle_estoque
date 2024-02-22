import {Card, CardContent, Grid, Typography} from "@mui/material";
import React from "react";

export const EquipmentCard = ({label, value}) => {
    return (
        <Card sx={{mb: 2, maxWidth: "700px"}}>
            <CardContent>
                <Grid container>
                    <Typography variant="body2" width="250px">
                        {label}:
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {value}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};
