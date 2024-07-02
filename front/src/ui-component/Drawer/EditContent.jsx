import React, { useEffect, useState } from 'react';
import { Chip, InputLabel, Box, TextField, Autocomplete } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Properties = ['Confidentiality', 'Integrity', 'Authenticity', 'Authorization', 'Non-repudiation', 'Availability'];

const EditContent = ({ selectedNode, nodes, setNodes, setSelectedNode }) => {
    const [details, setDetails] = useState({
        name: '',
        properties: []
        // bgColor: '#000000'
    });
    const [value, setValue] = React.useState('1');

    const handleDelete = (valueToDelete) => () => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            properties: prevDetails.properties.filter((property) => property !== valueToDelete)
        }));
    };

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    // console.log('selectedNode', selectedNode)

    useEffect(() => {
        setDetails({
            ...details,
            name: selectedNode?.data?.label ? selectedNode?.data?.label : '',
            properties: selectedNode?.properties ? selectedNode?.properties : []
            // bgColor: selectedNode?.data?.style?.backgroundColor ? selectedNode?.data?.style?.backgroundColor : '#000000'
        });
    }, [selectedNode]);

    // console.log('details', details)

    const handleChange = (event, newValue) => {
        setDetails({
            ...details,
            properties: newValue
        });
    };

    const handleStyle = (e, name) => {
        // console.log('name', name)
        // console.log('e', e.target.value)
        const list = [...nodes];
        const node = list?.find((nd) => nd?.id === selectedNode?.id);
        const Index = list?.findIndex((nd) => nd?.id === selectedNode?.id);
        // const {style} = node.data;
        if (name === 'name') {
            setDetails({ ...details, name: e.target.value });
            node.data.label = e.target.value;
        }
        // else {
        //     setDetails({ ...details, bgColor: e.target.value });
        //     style.backgroundColor = e.target.value;
        // }
        setSelectedNode(node);
        list[Index] = node;
        setNodes(list);
    };

    // console.log('details', details);
    return (
        <>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '230px' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Text" value="1" sx={{ minWidth: '73px' }} />
                        <Tab label="Diagram" value="2" sx={{ minWidth: '73px' }} />
                        <Tab label="Style" value="3" sx={{ minWidth: '73px' }} />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pr: 1.5, mt: 1 }}>
                        <InputLabel>Name :</InputLabel>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={details?.name}
                            onChange={(e) => handleStyle(e, 'name')}
                            sx={{
                                width: 'auto',
                                '& .MuiInputBase-input': {
                                    height: '0.4rem'
                                }
                            }}
                        />
                        <InputLabel>Properties :</InputLabel>

                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={Properties}
                            value={details.properties}
                            onChange={handleChange}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    padding: '3px'
                                }
                            }}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        key={option}
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                        onDelete={handleDelete(option)}
                                    />
                                ))
                            }
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value="2">Diagram</TabPanel>
                <TabPanel value="3">Style</TabPanel>
            </TabContext>
        </>
    );
};

export default EditContent;
