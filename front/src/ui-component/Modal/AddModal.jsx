import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Box,
    TextField,
    Slide,
    useTheme
} from '@mui/material';
import useStore from '../../Zustand/store';
import { v4 as uid } from 'uuid';
import { shallow } from 'zustand/shallow';
import { storeCurrentId } from '../../store/slices/CurrentIdSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const selector = (state) => ({
    create: state.createModal
});
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

function getStyles(name, nodes, theme) {
    return {
        fontWeight: nodes.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}
const Properties = ['Confidentiality', 'Integrity', 'Authenticity', 'Authorization', 'Non-repudiation', 'Availability'];

export default function AddModal({ open, handleClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { create } = useStore(selector, shallow);
    const theme = useTheme();
    const [templateDetails, setTemplateDetails] = React.useState({
        name: '',
        properties: []
    });
    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setTemplateDetails({
            ...templateDetails,
            properties: typeof value === 'string' ? value.split(',') : value
        });
    };

    const handleCreate = () => {
        const newModal = {
            ...templateDetails,
            id: uid()
        };
        create(newModal)
            .then((res) => {
                if (res) {
                    console.log('res in create', res);
                    const { id } = res.data;
                    dispatch (storeCurrentId(id));
                    
                    setTimeout(() => {
                        alert('Added Succesfully');
                        navigate(`/Modals/${id}`);
                        // window.location.reload();
                    }, 500);
                }
            })
            .catch((err) => console.log('err', err));
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ fontSize: 20, fontFamily: 'Inter' }}>{'Add Model'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 1 }}>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                onChange={(e) => setTemplateDetails({ ...templateDetails, name: e.target.value })}
                            />
                            <FormControl sx={{ width: 350 }}>
                                <InputLabel notched id="demo-multiple-chip-label">
                                    Properties
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={templateDetails.properties}
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
                                        <MenuItem key={name} value={name} style={getStyles(name, templateDetails.properties, theme)}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={handleClose}>
                        cancel
                    </Button>
                    <Button variant="contained" onClick={handleCreate}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
