import React, { useEffect, useState } from 'react';
import { Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Box, TextField, useTheme } from '@mui/material';
import useStore from '../../Zustand/store';
import { shallow } from 'zustand/shallow';
import AlertMessage from '../Alert';
import { useParams } from 'react-router';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

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

const selector = (state) => ({
    getModals: state.getModals,
    getModalById: state.getModalById,
    update: state.updateModal
});
const EditContent = ({ selectedNode, modal, nodes, setNodes,setSelectedNode }) => {
    const { getModals, update, getModalById } = useStore(selector, shallow);
    const theme = useTheme();
    const { id } = useParams();
    const [details, setDetails] = useState({
        name: '',
        properties: [],
        bgColor: '#000000'
    });
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [value, setValue] = React.useState('1');

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    // console.log('selectedNode', selectedNode)

    useEffect(() => {
        setDetails({
            ...details,
            name: selectedNode?.data?.label ? selectedNode?.data?.label : '',
            properties: selectedNode?.properties ? selectedNode?.properties : [],
            bgColor: selectedNode?.data?.bgColor ? selectedNode?.data?.bgColor : '#000000'
        });
    }, [selectedNode]);

    // console.log('details', details)
    const handleSubmit = (e) => {
        e.preventDefault();
        const mod = { ...modal };
        // console.log('mod', mod);

        // const nodeId = mod.template?.nodes;
        // console.log('selectedNode', selectedNode)
        // console.log('nodeId', nodeId)
        // const node = mod.template?.nodes.find(nd=>nd.id.slice(0, -6) === selectedNode.id.slice(0, -3));
        // const index = mod.template?.nodes.findIndex(nd=>nd.id.slice(0, -6) === selectedNode.id.slice(0, -3));
        const node = mod.template?.nodes.find((nd) => nd.id === selectedNode.id);
        const index = mod.template?.nodes.findIndex((nd) => nd.id === selectedNode.id);
        console.log('index', index);
        node.data.label = details.name;
        node.data.bgColor = details.bgColor;
        node.properties = details.properties;
        // console.log('node', node)
        mod.template.nodes[index] = node;
        // console.log('mod', mod);
        update(mod)
            .then((res) => {
                if (res) {
                    setTimeout(() => {
                        setOpen(true);
                        setMessage('Node updated successfully');
                        setSuccess(true);
                        // window.location.reload();
                        getModalById(id);
                        getModals();
                    }, 500);
                }
            })
            .catch((err) => {
                console.log('err', err);
                setOpen(true);
                setSuccess(false);
                setMessage('Something went wrong');
            });
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

    const handleStyle = (e, name) => {
        console.log('name', name)
        console.log('e', e.target.value)
        const list = [...nodes];
        const node = list?.find(nd=>nd?.id === selectedNode?.id)
        const Index = list?.findIndex(nd=>nd?.id === selectedNode?.id);
        const {style} = node.data;
        if(name==='name'){
            setDetails({ ...details, name: e.target.value });
            node.data.label=e.target.value;
        }else{
            setDetails({ ...details, bgColor: e.target.value });
            style.backgroundColor = e.target.value;
        }
        setSelectedNode(node);  
        list[Index] = node;
        setNodes(list);
    };

    console.log('details', details)
    return (
        <>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width:'230px' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Text" value="1" sx={{ minWidth: '73px' }} />
                        <Tab label="Diagram" value="2" sx={{ minWidth: '73px' }} />
                        <Tab label="Style" value="3" sx={{ minWidth: '73px' }} />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pr: 1.5, mt:1 }}>
                        <InputLabel>Name :</InputLabel>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={details?.name}
                            onChange={(e)=>handleStyle(e,'name')}
                            sx={{
                                width: 'auto'
                            }}
                        />
                        <InputLabel>Properties :</InputLabel>
                        <FormControl sx={{ width: 'auto' }}>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={details.properties}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" />}
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
                        <input type="color" value={details?.bgColor} onChange={(e)=>handleStyle(e,'bgColor')} />
                        <Button onClick={handleSubmit} variant="outlined" sx={{ width: 'fit-content' }}>
                            Update
                        </Button>
                    </Box>
                </TabPanel>
                <TabPanel value="2">Diagram</TabPanel>
                <TabPanel value="3">Style</TabPanel>
            </TabContext>
            <AlertMessage open={open} message={message} setOpen={setOpen} success={success} />
        </>
    );
};

export default EditContent;
