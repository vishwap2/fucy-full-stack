
import React, { useEffect, useState } from 'react';
import {
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Box,
    TextField,
    useTheme
} from '@mui/material'

function getStyles(name, nodes, theme) {
    return {
        fontWeight: nodes.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}
const Properties = ['Confidentiality', 'Integrity', 'Authenticity', 'Authorization', 'Non-repudiation', 'Availability'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300
        }
    }
};

const EditContent = ({ selectedNode, modal }) => {
     const theme = useTheme();
    const [details, setDetails ] = useState({
        name:'',
        properties:[],

    })

    useEffect(()=>{
     setDetails({
        ...details,
        name:selectedNode?.data?.label ? selectedNode?.data?.label:'',
        properties:selectedNode?.properties ? selectedNode?.properties : [],
     })
    }, [selectedNode])
    const handleSubmit = (e) => {
        e.preventDefault();
        const mod = { ...modal };
        console.log('mod', mod);
        // const nodeId = mod.template?.nodes;
        // console.log('selectedNode', selectedNode)
        // console.log('nodeId', nodeId)
        // const node = mod.template?.nodes.find(nd=>nd.id.slice(0, -6) === selectedNode.id.slice(0, -3));
        // const index = mod.template?.nodes.findIndex(nd=>nd.id.slice(0, -6) === selectedNode.id.slice(0, -3));
        const node = mod.template?.nodes.find(nd=>nd.id === selectedNode.id);
        const index = mod.template?.nodes.findIndex(nd=>nd.id === selectedNode.id);
        console.log('index', index)
        console.log('node', node)    
    };
        const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setDetails({
            ...details,
            properties: typeof value === 'string' ? value.split(',') : value
        });
    };
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 1 }}>
                <InputLabel>Name :</InputLabel>
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={details?.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    sx={{
                        width: 'auto'
                    }}
                />
                <InputLabel>Properties :</InputLabel>
                <FormControl sx={{ width: 'auto' }}>
                                <InputLabel notched id="demo-multiple-chip-label">
                                    Properties
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={details.properties}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Properties" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {Properties.map((name) => (
                                        <MenuItem key={name} value={name} style={getStyles(name, details.properties, theme)}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button onClick={handleSubmit} variant='outlined' sx={{width:'fit-content'}}>Update</Button>
                            </Box>
        </>
    );
};

export default EditContent;
