import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { colorTheme } from '../../../../store/constant';
import AttackIcon from '../../../../assets/icons/attack.png';
import ItemIcon from '../../../../assets/icons/item.png';
import DamageIcon from '../../../../assets/icons/damage.png';
import ThreatIcon from '../../../../assets/icons/threat.png';
import CybersecurityIcon from '../../../../assets/icons/cybersecurity.png';
import RiskIcon from '../../../../assets/icons/risk.png';
import { Typography } from '@mui/material';

const imageComponents = {
    AttackIcon,
    ItemIcon,
    DamageIcon,
    ThreatIcon,
    CybersecurityIcon,
    RiskIcon
};

export default function MenuList() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabs = [
        {
            label: 'Item Definition',
            value: '1',
            icon: 'ItemIcon'
        },
        {
            label: 'Damage Scenarios',
            value: '3',
            icon: 'DamageIcon'
        },
        {
            label: 'Threat Scenarios',
            value: '4',
            icon: 'ThreatIcon'
        },
        {
            label: 'Attack Path Analysis',
            value: '5',
            icon: 'AttackIcon'
        },
        {
            label: 'Risk Treatment and Determination',
            value: '6',
            icon: 'RiskIcon'
        },
        {
            label: 'Cybersecurity Goals and Requirements',
            value: '7',
            icon: 'CybersecurityIcon'
        }
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

    const getImageLabel = (item) => {
        console.log('item?.icon', item?.icon);
        const Image = imageComponents[item?.icon];
        console.log('Image', Image);
        return (
            <div>
                {Image ? <img src={Image} alt={item.label} style={{ height: '25px', width: '25px' }} /> : null}
                <Typography variant="body2" mt={0.5} sx={{ fontSize: 13, color:colorTheme.tabContentClr, fontFamily:'Inter', }}>
                    {item?.label}
                </Typography>
            </div>
        );
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, display: 'flex', borderColor: 'transparent !important' }}>
                    <TabList
                        sx={{
                            '& .MuiTabs-scroller': {
                                overflowX: 'auto !important',
                                scrollbarWidth: 'none',
                                background: colorTheme.tabBG,
                                '& .Mui-selected': {
                                    // background: colorTheme.selectedTab,
                                    // border: '2px solid red',
                                    color: `${colorTheme.tabContentClr} !important`
                                },
                                '& .MuiTabs-indicator ': {
                                    backgroundColor: `${colorTheme.selectedTab} !important`
                                    //   display:'none'
                                },
                                '& .MuiButtonBase-root': {
                                    // color:'black'
                                }
                            }
                        }}
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        {tabs.map((item, i) => (
                            <Tab
                                key={i}
                                label={getImageLabel(item)}
                                value={item?.value}
                                sx={{ width: item?.label.length < 25 ? '200px' : '300px' }}
                            />
                        ))}
                    </TabList>
                </Box>
                {tabs.map((item, i) => (
                    <TabPanel
                        key={i}
                        value={item?.value}
                        sx={{ overflow: 'auto', scrollbarWidth: 'none', color: colorTheme.tabContentClr, fontFamily:'Inter', }}
                    >
                        {item?.label}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}
