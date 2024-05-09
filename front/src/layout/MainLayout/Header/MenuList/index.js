import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { colorTheme } from '../../../../store/constant';


export default function MenuList() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabs = [
        {
            label: 'Item Definition',
            value: '1',

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
            label: 'Attack Path Analysis',
            value: '5'
        },
        {
            label: 'Risk Treatment and Determination',
            value: '6'
        },
        {
            label: 'Cybersecurity Goals and Requirements',
            value: '7'
        },
        // {
        //     label: 'User Authorization',
        //     value: '9'
        // },
        // {
        //     label: 'Collaboration',
        //     value: '10'
        // },
        // {
        //     label: 'Project Management',
        //     value: '11'
        // },
        // {
        //     label: 'Reports',
        //     value: '12'
        // }
    ];

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, display: 'flex' , borderColor:'transparent !important'}}>
                    <TabList
                        sx={{
                          color:'black',
                            '& .MuiTabs-scroller': {
                                overflowX: 'auto !important',
                                scrollbarWidth: 'none',
                                background: colorTheme.tabBG,
                                color:'black',
                                '& .Mui-selected': {
                                    // background: colorTheme.selectedTab,
                                    // border: '2px solid red',
                                    color: colorTheme.tabContentClr,
                                },
                                '& .MuiTabs-indicator ': {
                                      backgroundColor:`${colorTheme.selectedTab} !important`
                                    //   display:'none'
                                    },
                                '& .MuiButtonBase-root':{
                                    // color:'black'
                                }
                            }
                        }}
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        {tabs.map((item, i) => (
                          <Tab key={i} label={item?.label} value={item?.value}  sx={{ width: item?.label.length < 25 ?'200px' :'300px'}}/>
                          ))}
                    </TabList>
                </Box>
                {tabs.map((item, i) => (
                  <TabPanel key={i} value={item?.value} sx={{overflow:'auto', scrollbarWidth:'none', color:colorTheme.tabContentClr}}>
                        {item?.label}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}
