import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStore from '../../Zustand/store';
import { shallow } from 'zustand/shallow';
import { useParams } from 'react-router';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Button, Typography, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { closeAll } from '../../store/slices/CurrentIdSlice';
import AddThreatScenarios from '../Modal/AddThreatScenario';
import { Box } from '@mui/system';
import  ColorTheme  from '../../store/ColorTheme';

const selector = (state) => ({
    modal: state.modal,
    getModal: state.getModalById
});

const Head = [
    { id: 1, name: 'ID' },
    { id: 2, name: 'Name' },
    { id: 3, name: 'Category' },
    { id: 4, name: 'Description' },
    { id: 5, name: 'Damage Scenarios' },
    { id: 6, name: 'Related Threats from Catalog' },
    { id: 7, name: 'Losses of Cybersecurity Properties' },
    { id: 8, name: 'Assets' },
    { id: 9, name: 'Related Attack Trees' },
    { id: 10, name: 'Related Attack Path Models' },
    { id: 11, name: 'Assessment References' },
    { id: 12, name: 'To be Assessed' },
    { id: 13, name: 'Assessment Jurification' }
];

const threatType = (value) => {
    // console.log('value', value)
    switch (value) {
        case 'Integrity':
            return 'Tampering';
        case 'Confidentiality':
            return 'Information Disclosure';
        case 'Availability':
            return 'Denial';
        case 'Authenticity':
            return 'Spoofing';
        case 'Authorization':
            return 'Elevation of Privilage';
        case 'Non-repudiation':
            return 'Rejection';
        default:
            return '';
    }
};
const useStyles = makeStyles({
    div: {
        width: 'max-content'
    }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        borderRight: '1px solid rgba(224, 224, 224, 1) !important'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderRight: '1px solid rgba(224, 224, 224, 1) !important'
    }
}));

const StyledTableRow = styled(TableRow)(() => ({
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));
export default function Tstable() {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [openTs, setOpenTs] = React.useState(false);
    const { modal, getModal } = useStore(selector, shallow);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        getModal(id);
    }, [id]);

    React.useEffect(() => {
        if (modal.scenarios) {
            const mod1 = modal?.scenarios[2]?.subs[0]?.losses?.map((dt) =>
            dt?.cyberLosses?.map((pr, prin) =>
                pr?.props?.map((pp, pin) => {
                    console.log('pp', pp)
                    return({
                    id: `TS0${prin}${pin}`,
                    name: `${threatType(pp)}  ${pp} of ${pr?.name} for Damage Scene ${dt?.id}`,
                    Description: `This is ${threatType(pp)} occured due to ${pp} in ${pr?.name} for Damage Scene ${dt?.id}`,
                    losses: []
                })}
            ))
        ).flat(2)

            console.log('modal in effect12', mod1)
            const mod2 = modal?.scenarios[2]?.subs[1]?.scenes;
            // console.log('mod2', mod2)
            const combained = mod1.concat(mod2);
            setRows(combained);
        }
    }, [modal]);
    console.log('rows', rows);

    const handleOpenModalTs = () => {
        setOpenTs(true);
    };
    const handleCloseTs = () => {
        setOpenTs(false);
    };

    console.log('rows', rows);

    console.log('modal12', modal);

    const handleBack = () => {
        dispatch(closeAll());
    };
    // console.log('selectedRow', selectedRow)
    return (
        <Box sx={{
            overflow: "auto",
            height: '-webkit-fill-available',
            minHeight:'moz-available'
            }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                    <KeyboardBackspaceRoundedIcon sx={{ float: 'left', cursor: 'pointer', ml: 1, color:ColorTheme().title }} onClick={handleBack} />
                    <Typography sx={{color:ColorTheme().title}}>Threat Scenario Table</Typography>
                </Box>
                <Button sx={{ float: 'right', mb: 2 }} variant="contained" onClick={handleOpenModalTs}>
                    Add New Scenario
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Head?.map((hd) => (
                                <StyledTableCell key={hd?.id}>{hd?.name}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <StyledTableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell component="td" scope="row">
                                    {row?.id?.slice(0, 6)}
                                </StyledTableCell>
                                <StyledTableCell component="td" scope="row">
                                    <Typography sx={{ width: 'max-content' }}>{row?.name}</Typography>
                                </StyledTableCell>
                                <StyledTableCell component="td" scope="row"></StyledTableCell>
                                <StyledTableCell component="td" scope="row">
                                    <div className={classes.div}>{row?.Description}</div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddThreatScenarios open={openTs} handleClose={handleCloseTs} modal={modal} id={id} />
        </Box>
    );
}
