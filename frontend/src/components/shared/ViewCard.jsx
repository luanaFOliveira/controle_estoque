import {Card, CardContent, Grid, Typography} from "@mui/material";
import React from "react";

export const ViewCard = ({label, value, width = "250px"}) => {
    return (
        <Card sx={{mb: 2, maxWidth: "700px"}}>
            <CardContent>
                <Grid container>
                    <Typography variant="body2" style={{width: width}}>
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
