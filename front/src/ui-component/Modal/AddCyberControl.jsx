import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    InputLabel,
    // Chip,
    // FormControl,
    // MenuItem,
    // OutlinedInput,
    // Select,
    // useTheme
    Box,
    TextField,
    Slide,
} from '@mui/material';
import useStore from '../../Zustand/store';
import { shallow } from 'zustand/shallow';
import { v4 as uid } from 'uuid';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 300
//         }
//     }
// };

// function getStyles(name, nodes, theme) {
//     return {
//         fontWeight: nodes.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
//     };
// }
// const Properties = ['Confidentiality', 'Integrity', 'Authenticity', 'Authorization', 'Non-repudiation', 'Availability'];

const selector =(state)=>({
    // create:state.addDamageScenario,
    update:state.updateModal,
    getModals:state.getModals,

})

export default function AddCyberControl({ open, handleClose, modal }) {
    const { 
        update
        // create
     } = useStore(selector,shallow);

    // const theme = useTheme();
    // console.log('modal in add', modal)
    const [templateDetails, setTemplateDetails] = React.useState({
        id:'',
        name: '',
        Description: '',
    });
    // const handleChange = (event) => {
    //     const {
    //         target: { value }
    //     } = event;
    //     setTemplateDetails({
    //         ...templateDetails,
    //         properties: typeof value === 'string' ? value.split(',') : value
    //     });
    // };


    const handleCreate = () => {
        // setTemplateDetails({...templateDetails,id:uid(),modalId:id})
        const mod = {...modal};
        const temp = {...templateDetails}
        temp.id=uid();
        mod.scenarios[4].subs[1].scenes.push(temp);
        // console.log('mod', mod)
        update(mod)
        .then(res=>
            {
                if(res){
                    setTimeout(() => {
                        alert('Added successfully');
                        // window.location.reload();
                        getModals();
                    }, 500);
                }
            })
        .catch(err=>console.log('err', err))
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
                    '& .MuiPaper-root':{
                        // background:'#999999',
                        width:'-webkit-fill-available'
                    },
                }}
            >
                <DialogTitle>{'Add Cybersecurity Control'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 1 }}>
                            <InputLabel>Name :</InputLabel>
                            <TextField
                                id="outlined-basic"
                                // label="Name"
                                value={templateDetails?.name}
                                variant="outlined"
                                placeholder='Name'
                                onChange={(e) => setTemplateDetails({ ...templateDetails, name: e.target.value })}
                            />
                            <InputLabel>Description :</InputLabel>
                            <TextField 
                            id="outlined-multiline-static" 
                            // label="Multiline" 
                            value={templateDetails?.Description}
                            multiline rows={4}
                            placeholder='Description'
                            onChange={(e) => setTemplateDetails({ ...templateDetails, Description: e.target.value })}

                            // defaultValue="Default Value" 
                            />
                           
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined'color='warning' onClick={handleClose}>cancel</Button>
                    <Button variant='contained' color='primary' onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}