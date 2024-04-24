import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function SelectLosses({
    open,
    handleClose,
    modal,
    rows,
    setRows,
    selectedRow,
    setSelectedRow,
    getModal,
    id,
    update
}) {
    const handleChange = (e, prop, item) => {
        if (e.target.checked) {
            if (Object.keys(selectedRow?.cyberLosses).length === 0) {
                let select = [...selectedRow.cyberLosses];
                const Details = {
                    name: item?.name,
                    props: [prop]
                };
                select.push(Details);
                let row = { ...selectedRow };
                row.cyberLosses = select;
                setSelectedRow(row);
            } else {
                let select = [...selectedRow.cyberLosses];
                const ele = selectedRow?.cyberLosses.find((it) => it.name === item?.name);
                const Index = selectedRow?.cyberLosses.findIndex((it) => it.name === item?.name);
                if (ele) {
                    if (!ele.props.includes(prop)) {
                        ele.props.push(prop);
                    }
                    select[Index] = ele;
                    let row = { ...selectedRow };
                    row.cyberLosses = select;
                    setSelectedRow(row);
                } else {
                    let select = [...selectedRow.cyberLosses];
                    const Details = {
                        name: item?.name,
                        props: [prop]
                    };
                    select.push(Details);
                    let row = { ...selectedRow };
                    row.cyberLosses = select;
                    setSelectedRow(row);
                }
            }
        } else {
            // console.log('here')
            let select = [...selectedRow.cyberLosses];
            const ele = selectedRow?.cyberLosses.find((it) => it.name === item?.name);
            const Index = selectedRow?.cyberLosses.findIndex((it) => it.name === item?.name);
            if (ele) {
                if (ele.props.includes(prop)) {
                    const filt = ele.props.filter((it) => it !== prop);
                    ele.props = filt;
                    select[Index] = ele;
                    let row = { ...selectedRow };
                    row.cyberLosses = select;
                    setSelectedRow(row);
                }
                if (ele.props.length === 0) {
                    select.splice(Index, Index + 1);
                }
            }
        }
    };


    const handleClick = () => {
        // console.log('selectedRow', selectedRow);
        // console.log('modal', modal)
        const mod={...modal};
        const Rows = [...rows];
        // console.log('Rows', Rows)
        const losses = mod?.scenarios[1]?.subs[0];
        const Index = Rows.findIndex((rw) => rw.id === selectedRow.id);
        Rows[Index] = selectedRow;
        const changes = Rows.map(rw=>{
            //eslint-disable-next-line
            const {Description, ...rest} = rw;
            return rest
        })
         
        const threat = mod?.scenarios[2]?.subs[0];
        const cybersec = Rows.filter((rw)=>{
            if(rw.cyberLosses.length>0){
                return rw
            }
        })
        // const props= cybersec?.map(cs=>
        //     cs.cyberLosses?.map(pr=>
        //         console.log('pr', pr)
        // ))

        threat.losses=cybersec,
        // console.log('props', props)
        // console.log('mod', mod)
        losses.losses = changes
        setRows(Rows);
        // console.log('threat', threat)
        console.log('mod', mod)
        update(mod)
        .then(res=>{
            if(res){
             setTimeout(() => {
                getModal(id)
             }, 500);
            }
        })
        .catch(err=>console.log('err', err))
        handleClose();
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiPaper-root': {
                        width: '-webkit-fill-available'
                    }
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{
                        fontSize: 20,
                        fontFamily: 'Inter',
                        fontWeight: 600
                    }}
                >
                    {'Select the Losses'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                        >
                            {modal?.scenarios[1]?.subs[0]?.Details?.map((item, i) => (
                                <TreeItem key={`a${i}`} nodeId={`a${i}`} label={item?.name}>
                                    {item?.props?.map((pr, ind) => (
                                        <TreeItem
                                            key={`${i}${ind}`}
                                            nodeId={`${i}${ind}`}
                                            label={
                                                <div>
                                                    <input type="checkbox" onChange={(e) => handleChange(e, pr, item)} />
                                                    Loss of {pr}
                                                </div>
                                            }
                                        />
                                    ))}
                                </TreeItem>
                            ))}
                        </TreeView>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='warning' onClick={handleClose}>close</Button>
                    <Button variant='contained' onClick={handleClick} autoFocus>
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
