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
    // selected,
    // setSelected,
    rows,
    setRows,
    selectedRow,
    setSelectedRow
}) {
    const handleChange = (e, prop, item) => {
        if (e.target.checked) {
            if (Object.keys(selectedRow?.losses).length === 0) {
                let select = [...selectedRow.losses];
                const Details = {
                    name: item?.name,
                    props: [prop]
                };
                select.push(Details);
                let row = { ...selectedRow };
                row.losses = select;
                setSelectedRow(row);
            } else {
                let select = [...selectedRow.losses];
                const ele = selectedRow?.losses.find((it) => it.name === item?.name);
                const Index = selectedRow?.losses.findIndex((it) => it.name === item?.name);
                if (ele) {
                    if (!ele.props.includes(prop)) {
                        ele.props.push(prop);
                    }
                    select[Index] = ele;
                    let row = { ...selectedRow };
                    row.losses = select;
                    setSelectedRow(row);
                } else {
                    let select = [...selectedRow.losses];
                    const Details = {
                        name: item?.name,
                        props: [prop]
                    };
                    select.push(Details);
                    let row = { ...selectedRow };
                    row.losses = select;
                    setSelectedRow(row);
                }
            }
        } else {
            // console.log('here')
            let select = [...selectedRow.losses];
            const ele = selectedRow?.losses.find((it) => it.name === item?.name);
            const Index = selectedRow?.losses.findIndex((it) => it.name === item?.name);
            if (ele) {
                if (ele.props.includes(prop)) {
                    const filt = ele.props.filter((it) => it !== prop);
                    ele.props = filt;
                    select[Index] = ele;
                    let row = { ...selectedRow };
                    row.losses = select;
                    setSelectedRow(row);
                }
                if (ele.props.length === 0) {
                    select.splice(Index, Index + 1);
                }
            }
        }
    };

    const handleClick = () => {
        console.log('selectedRow', selectedRow);
        console.log('rows', rows);
        const Rows = [...rows];
        const Index = Rows.findIndex((rw) => rw.id === selectedRow.id);
        Rows[Index] = selectedRow;
        setRows(Rows);
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
