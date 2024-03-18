import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Components from '../../../../views/NodeList';
import ComponentList from '../../../../views/Libraries';


export default function MenuList() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabs = [
        {
            label: 'Modal',
            value: '1',

        },
        {
            label: "MCU's Networks",
            value: '2'
        },
        {
            label: 'Damage Scenarios',
            value: '3'
        },
        {
            label: 'Threat Scenarios',
            value: '4'
        },
        {
            label: 'Attach Tree',
            value: '5'
        },
        {
            label: 'Traceability',
            value: '6'
        },
        {
            label: 'Risk Analyser',
            value: '7'
        },
        {
            label: 'config Management',
            value: '8'
        },
        {
            label: 'User Authorization',
            value: '9'
        },
        {
            label: 'Collaboration',
            value: '10'
        },
        {
            label: 'Project Management',
            value: '11'
        },
        {
            label: 'Reports',
            value: '12'
        }
    ];

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
                    <TabList
                        sx={{
                          color:'black',
                            '& .MuiTabs-scroller': {
                                overflowX: 'auto !important',
                                scrollbarWidth: 'none',
                                background: 'antiquewhite',
                                color:'black',
                                '& .Mui-selected': {
                                    background: ' #ffba3a',
                                    // border: '2px solid red',
                                    color: 'whitesmoke !important',
                                },
                                '& .MuiTabs-indicator ': {
                                      // backgroundColor:'#390000 !important'
                                      display:'none'
                                    },
                                '& .MuiButtonBase-root':{
                                    color:'black'
                                }
                            }
                        }}
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        {tabs.map((item, i) => (
                          <Tab key={i} label={item?.label} value={item?.value} />
                          ))}
                    </TabList>
                </Box>
                {tabs.map((item, i) => (
                  <TabPanel key={i} value={item?.value}>
                        {item?.label === 'Modal' ? <Components /> : item?.label === "MCU's Networks"?<ComponentList/> : item?.label}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}
