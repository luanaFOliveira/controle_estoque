import React from 'react';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

const LogoJetimob = ({ logoWidth, logoHeight, fontSize }) => {
    return (
        <Box align='center' sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
                width: logoWidth,
                height: logoHeight,
                backgroundColor: '#284670',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <HomeRoundedIcon sx={{ color: 'white' }} />
            </Box>
            <Typography
                component="h1"
                variant="h2"
                sx={{
                    ml: 1, fontWeight: 'bold', color: '#284670', fontSize: fontSize || 'inherit', userSelect: 'none'
                }}
            >
                Jetimob
            </Typography>
        </Box>
    );
};

export default LogoJetimob;