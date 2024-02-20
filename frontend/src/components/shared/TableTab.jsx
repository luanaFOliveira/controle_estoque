import {CircularProgress, Container,Typography,Grid, Tab,Tabs, Box} from "@mui/material";
import PropTypes from 'prop-types';

export function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export function TableTab({value,setValue,nameTab1,nameTab2}){


    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

//forced scroll buttons
    return(
        <Box >
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={nameTab1} {...a11yProps(0)} />
                <Tab label={nameTab2} {...a11yProps(1)} />
            </Tabs>
        </Box>
    );

};