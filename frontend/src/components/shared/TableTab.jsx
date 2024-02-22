import {Typography, Tab,Tabs, Box} from "@mui/material";
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


export function TableTab({value,setValue,nameTabs}){


    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Box >
            <Tabs 
              value={value} 
              onChange={handleChange} 
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              >
                {nameTabs.map((name, index) => (
                    <Tab label={name} {...a11yProps(index)} />
                ))}
            </Tabs>
        </Box>
    );

};