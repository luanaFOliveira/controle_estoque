// LogoJetimob.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const LogoJetimob = ({ logoWidth, logoHeight, fontSize, disableLink }) => {
    const content = (
        <Box align='center' sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
                width: logoWidth || '60px',
                height: logoHeight || '60px',
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
                    ml: 2, fontWeight: 'bold', color: '#284670', fontSize: fontSize || 'inherit', userSelect: 'none'
                }}
            >
                Jetimob
            </Typography>
        </Box>
    );

    return disableLink ? (
        content
    ) : (
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            {content}
        </Link>
    );
};

export default LogoJetimob;
