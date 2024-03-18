import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStore from '../../Zustand/store';
import { shallow } from 'zustand/shallow';
import { useParams } from 'react-router';
// import CircleIcon from '@mui/icons-material/Circle';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import AddDamageScenarios from '../Modal/AddDamageScenario';
import { useDispatch } from 'react-redux';
import { TableClose } from '../../store/slices/CurrentIdSlice';
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows=[];
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
export default function DsTable() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [openDs, setOpenDs] = React.useState(false);
    // const [rows, setRows] = React.useState([])
    // const [impacts, setImpacts] = React.useState({
    //     Safety: '',
    //     Financial: '',
    //     Operational: '',
    //     Privacy: ''
    // });
    const { modal, getModal } = useStore(selector, shallow);
    const [rows, setRows ] = React.useState([]);
    React.useEffect(() => {
        getModal(id);
    }, [id]);

    React.useEffect(()=>{
        if(modal.scenarios){
            // console.log('modal in effect', modal?.scenarios[1]?.subs[1]?.scenes)
             setRows(modal?.scenarios[1]?.subs[1]?.scenes);
        }
    },[modal])
    console.log('rows', rows)

    const handleOpenModalDs = () => {
      setOpenDs(true);
  };
  const handleCloseDs = () => {
      setOpenDs(false);
  };

    const handleChange = (e,row) => {
        // console.log('e', e);
        // console.log('row', row);
        const Rows = [...rows];
        const editRow = Rows.find(ele=>ele.id === row.id);
        // console.log('editRow', editRow);
        if(!editRow.impacts){
            editRow.impacts = {};
        }
        
       const {name, value } = e.target;
       if(name){
        // setImpacts({...impacts, [`${name}`]:value})
        editRow.impacts = {...editRow.impacts,[`${name}`]:value}
       }
       const Index = Rows.findIndex(
        (it) => it.id === editRow.id
      )
       Rows[Index] = editRow;
       setRows(Rows);
    };
    console.log('rows', rows)

    const colorPickerTab =(value)=>{
  if(value === 'Severe'){
    return 'red';
  }
  if(value === 'Major'){
    return 'orange';
  }
  if(value === 'Moderate'){
    return 'yellow';
  }
  if(value === 'Negligible'){
    return '#65B741';
  }
  return 'white'

    }

    // console.log('modal12', modal);
    // const colorPicker = (pr) => {
    //     console.log('pr', pr);
    //     switch (pr) {
    //         case 'Confidentiality':
    //             return 'red';
    //         case 'Integrity':
    //             return 'green';
    //         case 'Availability':
    //             return 'yellow';
    //         case 'Authenticity':
    //             return 'blue';
    //         case 'Authorization':
    //             return 'violet';
    //         case 'Non-repudiation':
    //             return 'gray';
    //         default:
    //             return 'black';
    //     }
    // };

    const options = [
        { value: 'Severe', label: 'Severe' },
        { value: 'Major', label: 'Major' },
        { value: 'Moderate', label: 'Moderate' },
        { value: 'Negligible', label: 'Negligible' }
    ];
    const handleBack = () => {
     dispatch(TableClose())
    }
    return (
      <>
      <KeyboardBackspaceRoundedIcon sx={{float:'left',cursor:'pointer',ml:1}} onClick={handleBack}/>
      <Button sx={{float:"right",mb:2}} variant='contained' onClick={handleOpenModalDs}>Add New Scenario</Button>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Head?.map((hd) => (
                            <TableCell key={hd?.id}>{hd?.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                    <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            {row?.id?.slice(0,6)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row?.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row?.scalability}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row?.Description}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {/* {modal?.scenarios[2]?.Details?.map((det) =>
                                det?.props?.map((pr, i) => (
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
                                ))
                            )} */}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {/* {modal?.scenarios[2]?.Details?.map((dt) => (
                                <div key={dt.name}>{dt.name}</div>
                            ))} */}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {/* {modal?.scenarios[2]?.Details?.map((dt) => (
                                <div key={dt.name}>{dt.name}</div>
                            ))} */}
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{background:colorPickerTab(row?.impacts?.Safety)}}>
                            <FormControl 
                            sx={{
                              width: 130,
                              background:'transparent',
                              '& .MuiInputBase-root':{
                                backgroundColor:'transparent'
                              },
                              '& .MuiSelect-select':{
                                backgroundColor:'transparent'
                              },
                              '& .MuiSvgIcon-root': {
                                  display: 'none'
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                  border: 'none'
                              }
                          }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='Safety'
                                    // value={impacts?.Safety}
                                    onChange={(e)=>handleChange(e,row)}
                                >
                                    {options.map(item=><MenuItem key={item?.value} value={item?.value}>{item?.label}</MenuItem>)}
                                    
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{background:colorPickerTab(row?.impacts?.Financial)}}>
                        <FormControl 
                             sx={{
                              width: 130,
                              background:'transparent',
                              '& .MuiInputBase-root':{
                                backgroundColor:'transparent'
                              },
                              '& .MuiSelect-select':{
                                backgroundColor:'transparent'
                              },
                              '& .MuiSvgIcon-root': {
                                  display: 'none'
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                  border: 'none'
                              }
                          }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='Financial'
                                    // value={impacts?.Financial}
                                    onChange={(e)=>handleChange(e,row)}
                                >
                                    {options.map(item=><MenuItem key={item?.value} value={item?.value}>{item?.label}</MenuItem>)}
                                    
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{background:colorPickerTab(row?.impacts?.Operational)}}>
                        <FormControl 
                             sx={{
                              width: 130,
                              background:'transparent',
                              '& .MuiInputBase-root':{
                                backgroundColor:'transparent'
                              },
                              '& .MuiSelect-select':{
                                backgroundColor:'transparent'
                              },
                              '& .MuiSvgIcon-root': {
                                  display: 'none'
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                  border: 'none'
                              }
                          }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='Operational'
                                    // value={impacts?.Operational}
                                    onChange={(e)=>handleChange(e,row)}
                                >
                                    {options.map(item=><MenuItem key={item?.value} value={item?.value}>{item?.label}</MenuItem>)}
                                    
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{background:colorPickerTab(row?.impacts?.Privacy)}}>
                        <FormControl 
                             sx={{
                              width: 130,
                              background:'transparent',
                              '& .MuiInputBase-root':{
                                backgroundColor:'transparent'
                              },
                              '& .MuiSelect-select':{
                                backgroundColor:'transparent'
                              },
                              '& .MuiSvgIcon-root': {
                                  display: 'none'
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                  border: 'none'
                              }
                          }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='Privacy'
                                    // value={impacts?.Privacy}
                                    onChange={(e)=>handleChange(e,row)}
                                >
                                    {options.map(item=><MenuItem key={item?.value} value={item?.value}>{item?.label}</MenuItem>)}
                                    
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                     ))} 
                </TableBody>
            </Table>
        </TableContainer>
            <AddDamageScenarios open={openDs} handleClose={handleCloseDs} modal={modal}/>
        </>
    );
}
