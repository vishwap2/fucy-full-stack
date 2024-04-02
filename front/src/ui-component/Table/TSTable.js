import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStore from '../../Zustand/store';
import { shallow } from 'zustand/shallow';
import { useParams } from 'react-router';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Button, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { TsTableClose } from '../../store/slices/CurrentIdSlice';
import AddThreatScenarios from '../Modal/AddThreatScenario';

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

const useStyles = makeStyles({
    div: {
      width:'max-content', 
    },
  });
  
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(() => ({
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
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
            // console.log('modal in effect', modal?.scenarios[1]?.subs[1]?.scenes)
            setRows(modal?.scenarios[2]?.subs[1]?.scenes);
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
        dispatch(TsTableClose());
    };
    // console.log('selectedRow', selectedRow)
    return (
        <>
            <KeyboardBackspaceRoundedIcon sx={{ float: 'left', cursor: 'pointer', ml: 1 }} onClick={handleBack} />
            <Button sx={{ float: 'right', mb: 2 }} variant="contained" onClick={handleOpenModalTs}>
                Add New Scenario
            </Button>
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
                                    {row?.name}
                                </StyledTableCell>
                                <StyledTableCell component="td" scope="row">
                                <div className={classes.div}>{row?.Description}</div>
                                </StyledTableCell>
                                </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddThreatScenarios open={openTs} handleClose={handleCloseTs} modal={modal} />
          
        </>
    );
}
