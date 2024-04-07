import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    InputLabel,
    Box,
    TextField,
    Slide
} from '@mui/material';
import useStore from '../../Zustand/store';
import { shallow } from 'zustand/shallow';
import { v4 as uid } from 'uuid';
import { useParams } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const selector = (state) => ({
    update: state.updateModal,
    getModal: state.getModalById,
    modal: state.modal
});

export default function CyberSecurityModal({ open, handleClose, name }) {
    const { update, getModal, modal } = useStore(selector, shallow);
    const [templateDetails, setTemplateDetails] = React.useState({
        name: ''
    });

    const { id } = useParams();

    React.useEffect(() => {
        getModal(id);
    }, [id]);

    console.log('name', name);
    const handleCreate = () => {
        const mod = { ...modal };
       let cyber =  mod.scenarios[4].subs[0];
        if (name === 'Goals') {
            cyber?.goals.push({
                id: uid(),
                name: templateDetails.name
            });
        } else {
            cyber?.requirements.push({
                id: uid(),
                name: templateDetails.name
            });
        }
        update(mod)
        // .then(res=>
        //     {
        //         if(res){
        //             setTimeout(() => {
        //                 alert('Added successfully');
        //                 window.location.reload();
        //             }, 500);
        //         }
        //     })
        // .catch(err=>console.log('err', err))
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    '& .MuiPaper-root': {
                        // background:'#999999',
                        width: '-webkit-fill-available'
                    }
                }}
            >
                <DialogTitle>Add {name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 1 }}>
                            <InputLabel>Name :</InputLabel>
                            <TextField
                                id="outlined-basic"
                                // label="Name"
                                value={templateDetails?.name}
                                variant="outlined"
                                placeholder="Name"
                                onChange={(e) => setTemplateDetails({ ...templateDetails, name: e.target.value })}
                            />
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="warning" onClick={handleClose}>
                        cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleCreate}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
