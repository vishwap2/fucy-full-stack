import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import useStore from '../../Zustand/store';
import { v4 as uid } from 'uuid';
import AlertMessage from '../Alert';

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

const names = ['Confidentiality', 'Integrity', 'Authenticity', 'Authorization', 'Non-repudiation', 'Availability'];

const selector = (state) => ({
    nodeState: state.sidebarNodes,
    addNode: state.addNewNode,
    create: state.createComponent
});

function getStyles(name, nodes, theme) {
    return {
        fontWeight: nodes.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

const AddNewNode = ({ open, handleClose, getSidebarNode }) => {
    const theme = useTheme();
    const [newNode, setNewNode] = useState({
        nodeName: '',
        type: '',
        properties: [],
        bgColor: '#dadada'
    });
    const [openMsg, setOpenMsg] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const {
        // create
        addNode
    } = useStore(selector);

    //Name & type for the new Node
    const handleChange = (event) => {
        const {
            target: { value, name }
        } = event;
        if (name) {
            setNewNode({
                ...newNode,
                [`${name}`]: value
            });
        }
    };

    // For Adding new Node
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataNode = {
            id: uid(),
            data: { label: newNode.nodeName, bgColor: newNode.bgColor },
            type: newNode.type,
            properties: newNode.properties,
            width: 120,
            height: 50
        };

        addNode(dataNode)
            .then((res) => {
                if (res.data) {
                    setTimeout(() => {
                        setOpenMsg(true);
                        setMessage('Damage scene created Successfully');
                        setSuccess(true);
                        getSidebarNode();
                    }, []);
                }
            })
            .catch((err) => {
                console.log('err', err);
                setOpenMsg(true);
                setSuccess(false);
                setMessage('Something went wrong');
            });
        // create(data);

        handleClose();
        setNewNode({
            nodeName: '',
            type: '',
            properties: [],
            bgColor: '#dadada'
        });
    };

    const CloseModel = () => {
        handleClose();
        setNewNode({
            nodeName: '',
            type: '',
            properties: [],
            bgColor: '#dadada'
        });
    };

    // console.log('newNode', newNode);
    return (
        <>
            <Dialog open={open} onClose={CloseModel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Add New '}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 1 }}>
                        <TextField id="outlined-basic" label="Name" name="nodeName" variant="outlined" onChange={handleChange} />
                        <FormControl sx={{ width: 350 }}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newNode.type}
                                label="type"
                                onChange={handleChange}
                                name="type"
                            >
                                <MenuItem value="input">Input</MenuItem>
                                <MenuItem value="default">Default</MenuItem>
                                <MenuItem value="signal">Signal</MenuItem>
                                <MenuItem value="receiver">Receiver</MenuItem>
                                <MenuItem value="output">Output</MenuItem>
                                <MenuItem value="transceiver">Transceiver</MenuItem>
                                <MenuItem value="transmitter">Transmitter</MenuItem>
                                <MenuItem value="mcu">MicroController</MenuItem>
                                <MenuItem value="memory">Memory</MenuItem>
                                <MenuItem value="multihandle">Multi-Handle</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 350 }}>
                            <InputLabel notched id="demo-multiple-chip-label">
                                Properties
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                name="properties"
                                value={newNode.properties}
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
                                {names.map((name) => (
                                    <MenuItem key={name} value={name} style={getStyles(name, newNode.properties, theme)}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* <label>
                        Choose Node color :{' '}
                        <input type="color" value={newNode.bgColor} onChange={(e) => setNewNode({ ...newNode, bgColor: e.target.value })} />
                    </label> */}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={CloseModel} variant="outlined" color="warning">
                        cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!newNode.nodeName || !newNode.type || !newNode.properties.length > 0}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <AlertMessage open={openMsg} message={message} setOpen={setOpenMsg} success={success} />
        </>
    );
};

export default AddNewNode;
