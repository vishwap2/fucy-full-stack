import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStore from '../../Zustand/store';
import { shallow } from 'zustand/shallow';
import { useParams } from 'react-router';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Button, FormControl, MenuItem, Select, styled } from '@mui/material';
import AddDamageScenarios from '../Modal/AddDamageScenario';
import { useDispatch } from 'react-redux';
import { DsTableClose } from '../../store/slices/CurrentIdSlice';
import SelectLosses from '../Modal/SelectLosses';
import { makeStyles } from '@mui/styles';

const selector = (state) => ({
    modal: state.modal,
    getModal: state.getModalById
});
const Head = [
    { id: 1, name: 'ID' },
    { id: 2, name: 'Name' },
    { id: 3, name: 'Scalability' },
    { id: 4, name: 'Description' },
    { id: 5, name: 'Losses of Cybersecurity Properties' },
    { id: 6, name: 'Assets' },
    { id: 7, name: 'Component/Message' },
    { id: 8, name: 'Safety Impact' },
    { id: 9, name: 'Financial Impact' },
    { id: 10, name: 'Operational Impact' },
    { id: 11, name: 'Privacy Impact' },
    { id: 12, name: 'Associated Threat Scenarios' },
    { id: 13, name: 'Overall Impact' }
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
  
export default function DsTable() {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [openDs, setOpenDs] = React.useState(false);
    const [openCl, setOpenCl] = React.useState(false);
    // const [rows, setRows] = React.useState([])
    const { modal, getModal } = useStore(selector, shallow);
    const [rows, setRows] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState({});

    React.useEffect(() => {
        getModal(id);
    }, [id]);

    const handleOpenCl = (row) => {
        setSelectedRow(row);
        setOpenCl(true);
    };

    const handleCloseCl = () => {
        setOpenCl(false);
        setSelectedRow({});
    };
    React.useEffect(() => {
        if (modal.scenarios) {
            // console.log('modal in effect', modal?.scenarios[1]?.subs[1]?.scenes)
            setRows(modal?.scenarios[1]?.subs[1]?.scenes);
        }
    }, [modal]);
    console.log('rows', rows);

    const handleOpenModalDs = () => {
        setOpenDs(true);
    };
    const handleCloseDs = () => {
        setOpenDs(false);
    };

    const handleChange = (e, row) => {
        const Rows = [...rows];
        const editRow = Rows.find((ele) => ele.id === row.id);
        // console.log('editRow', editRow);
        if (!editRow.impacts) {
            editRow.impacts = {};
        }

        const { name, value } = e.target;
        if (name) {
            editRow.impacts = { ...editRow.impacts, [`${name}`]: value };
        }
        const Index = Rows.findIndex((it) => it.id === editRow.id);
        Rows[Index] = editRow;
        setRows(Rows);
    };
    console.log('rows', rows);

    const colorPickerTab = (value) => {
        if (value === 'Severe') {
            return 'red';
        }
        if (value === 'Major') {
            return 'orange';
        }
        if (value === 'Moderate') {
            return 'yellow';
        }
        if (value === 'Negligible') {
            return '#65B741';
        }
        return 'white';
    };

    console.log('modal12', modal);
    const colorPicker = (pr) => {
        // console.log('pr', pr);
        switch (pr) {
            case 'Confidentiality':
                return 'red';
            case 'Integrity':
                return 'green';
            case 'Availability':
                return 'yellow';
            case 'Authenticity':
                return 'blue';
            case 'Authorization':
                return 'violet';
            case 'Non-repudiation':
                return 'gray';
            default:
                return 'black';
        }
    };

    const options = [
        { value: 'Severe', label: 'Severe' },
        { value: 'Major', label: 'Major' },
        { value: 'Moderate', label: 'Moderate' },
        { value: 'Negligible', label: 'Negligible' }
    ];
    const handleBack = () => {
        dispatch(DsTableClose());
    };
    // console.log('selectedRow', selectedRow)
    return (
        <>
            <KeyboardBackspaceRoundedIcon sx={{ float: 'left', cursor: 'pointer', ml: 1 }} onClick={handleBack} />
            <Button sx={{ float: 'right', mb: 2 }} variant="contained" onClick={handleOpenModalDs}>
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
                            <StyledTableRow key={row?.id} >
                                <StyledTableCell component="th" scope="row">
                                    {row?.id?.slice(0, 6)}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row?.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row?.scalability}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                 <div className={classes.div}>{row?.Description}</div>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" onClick={() => handleOpenCl(row)}>
                                    {row?.losses?.map((loss) => (
                                        <div key={loss} style={{marginBottom:'5px'}}>
                                            {loss?.props.map((pr, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 5
                                                    }}
                                                >
                                                    <CircleIcon sx={{ fontSize: 14, color: colorPicker(pr) }} />
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '15px',
                                                            width: 'max-content'
                                                        }}
                                                    >
                                                        Loss of {pr}
                                                    </span>
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    <div style={{
                                        display:'flex',
                                        flexDirection:'column',
                                        alignItems:'flex-start',
                                        gap:8
                                    }}>
                                    {row?.losses?.map((loss) => (
                                        <span key={loss} style={{display:'flex',flexDirection:'column',justifyContent:'space-around'}}>{loss?.name}</span>
                                    ))}
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {/* {modal?.scenarios[2]?.Details?.map((dt) => (
                                <div key={dt.name}>{dt.name}</div>
                            ))} */}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" sx={{ background: colorPickerTab(row?.impacts?.Safety) }}>
                                    <FormControl
                                        sx={{
                                            width: 130,
                                            background: 'transparent',
                                            '& .MuiInputBase-root': {
                                                backgroundColor: 'transparent'
                                            },
                                            '& .MuiSelect-select': {
                                                backgroundColor: 'transparent'
                                            },
                                            '& .MuiSvgIcon-root': {
                                                display: 'none'
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none'
                                            }
                                        }}
                                    >
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="Safety"
                                            // value={impacts?.Safety}
                                            onChange={(e) => handleChange(e, row)}
                                        >
                                            {options.map((item) => (
                                                <MenuItem key={item?.value} value={item?.value}>
                                                    {item?.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" sx={{ background: colorPickerTab(row?.impacts?.Financial) }}>
                                    <FormControl
                                        sx={{
                                            width: 130,
                                            background: 'transparent',
                                            '& .MuiInputBase-root': {
                                                backgroundColor: 'transparent'
                                            },
                                            '& .MuiSelect-select': {
                                                backgroundColor: 'transparent'
                                            },
                                            '& .MuiSvgIcon-root': {
                                                display: 'none'
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none'
                                            }
                                        }}
                                    >
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="Financial"
                                            onChange={(e) => handleChange(e, row)}
                                        >
                                            {options.map((item) => (
                                                <MenuItem key={item?.value} value={item?.value}>
                                                    {item?.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" sx={{ background: colorPickerTab(row?.impacts?.Operational) }}>
                                    <FormControl
                                        sx={{
                                            width: 130,
                                            background: 'transparent',
                                            '& .MuiInputBase-root': {
                                                backgroundColor: 'transparent'
                                            },
                                            '& .MuiSelect-select': {
                                                backgroundColor: 'transparent'
                                            },
                                            '& .MuiSvgIcon-root': {
                                                display: 'none'
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none'
                                            }
                                        }}
                                    >
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="Operational"
                                            // value={impacts?.Operational}
                                            onChange={(e) => handleChange(e, row)}
                                        >
                                            {options.map((item) => (
                                                <MenuItem key={item?.value} value={item?.value}>
                                                    {item?.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" sx={{ background: colorPickerTab(row?.impacts?.Privacy) }}>
                                    <FormControl
                                        sx={{
                                            width: 130,
                                            background: 'transparent',
                                            '& .MuiInputBase-root': {
                                                backgroundColor: 'transparent'
                                            },
                                            '& .MuiSelect-select': {
                                                backgroundColor: 'transparent'
                                            },
                                            '& .MuiSvgIcon-root': {
                                                display: 'none'
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none'
                                            }
                                        }}
                                    >
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="Privacy"
                                            // value={impacts?.Privacy}
                                            onChange={(e) => handleChange(e, row)}
                                        >
                                            {options.map((item) => (
                                                <MenuItem key={item?.value} value={item?.value}>
                                                    {item?.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddDamageScenarios open={openDs} handleClose={handleCloseDs} modal={modal} />
            {openCl && (
                <SelectLosses
                    open={openCl}
                    handleClose={handleCloseCl}
                    modal={modal}
                    rows={rows}
                    setRows={setRows}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                />
            )}
        </>
    );
}
