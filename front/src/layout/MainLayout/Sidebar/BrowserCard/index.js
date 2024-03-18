// material-ui
import {
    styled
    // , useTheme
} from '@mui/material/styles';
import {
    // Avatar,
    Card,
    CardContent,
    Typography
    // Grid,
    // LinearProgress,
    // List,
    // ListItem,
    // ListItemAvatar,
    // ListItemText,
    // linearProgressClasses
} from '@mui/material';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import AddModal from '../../../../ui-component/Modal/AddModal';
// import { v4 as uid} from 'uuid'
import { useNavigate } from 'react-router';
import { TableOpen } from '../../../../store/slices/CurrentIdSlice';
import { useDispatch } from 'react-redux';
// assets
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 10,
//     borderRadius: 30,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: '#fff'
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: theme.palette.primary.main
//     }
// }));

const CardStyle = styled(Card)(() =>
    // { theme }
    ({
        // background: theme.palette.primary.light,
        marginBottom: '22px',
        overflow: 'hidden',
        position: 'relative',
        height: '40vh',
        boxShadow: 'inset 0px 0px 7px gray',
        '&:after': {
            content: '""',
            position: 'absolute',
            // width: '157px',
            // height: '157px',
            // background: theme.palette.primary[200],
            borderRadius: '50%',
            top: '-105px',
            right: '-96px',
        }
    })
);

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

// function LinearProgressWithLabel({ value, ...others }) {
//     const theme = useTheme();

//     return (
//         <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
//             <Grid item>
//                 <Grid container justifyContent="space-between">
//                     <Grid item>
//                         <Typography variant="h6" sx={{ color: theme.palette.primary[800] }}>
//                             Properties
//                         </Typography>
//                     </Grid>
//                     <Grid item>
//                         <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             <Grid item>
//                 <BorderLinearProgress variant="determinate" {...others} />
//             </Grid>
//         </Grid>
//     );
// }

// ==============================|| SIDEBAR MENU Card ||============================== //

const BrowserCard = ({modals, template, handleClick,nodes }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('nodes', nodes)
    const [ModalDetails,setModalDetails] = useState([]);
    // const [Modal,setModal] = useState([]);
    const [open, setOpen] = useState(false);
    
    console.log('template', template);
    
    useEffect(()=>{
            setModalDetails(modals);
    },[modals])
    // const theme = useTheme();
    const handleOpenModal = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleNavigate = (id) => {
        navigate(`/Modals/${id}`,{replace:true});
        // console.log('id', id)
    }
    console.log('ModalDetails', ModalDetails);
    const handleSwicthTable = () => {
        dispatch(TableOpen())
    }

    return (
        <>
            <Typography variant="h4">Modals</Typography>
            <CardStyle sx={{overflowY:'auto'}}>
                <CardContent sx={{ p: 2 }}>
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {ModalDetails && ModalDetails?.map((modal) => {
                            // console.log('item', Object.values(modal?.scenarios))
                            return (
                                <TreeItem key={modal?.id} nodeId={modal?.id} label={modal?.name} onClick={()=>handleNavigate(modal?.id)} onDoubleClick={handleSwicthTable}>
                                    {modal?.scenarios?.map((scene) => (
                                        <TreeItem
                                            key={scene?.name}
                                            nodeId={scene?.name}
                                            label={scene?.name}
                                            onClick={() => handleClick(scene)}
                                            sx={{
                                                '& .MuiTreeItem-label':{
                                                fontSize:'12px',
                                                fontWeight:500,
                                                my:0.2,
                                                }
                                            }}

                                        >
                                    {scene?.name === 'Item Modal & Assets' && scene?.Details?.map((value,i)=>( 
                                           <TreeItem key={`1${i}`} nodeId={`1${i}`} label={`[000${i}] ${value?.name}`}>
                                            {value?.props.map(pr=>(

                                            <TreeItem key={value?.name} nodeId={value?.name} label={<div style={{display:'flex',alignItems:'center',marginLeft:'-31px',gap:2}}><CircleRoundedIcon sx={{color:'red',fontSize:13}}/>{`Loss of ${pr}`}</div>}> 
                                            </TreeItem> 
                                            ))}

                                           </TreeItem>
                                           ))}
                                        
                                           {scene?.name ==='Damage Scenarios Identification and Impact Ratings' &&
                                           scene?.subs?.map((sub)=>(
                                               <TreeItem key={`1${sub?.name}`} nodeId={`1${sub?.name}`} label={sub?.name}>
                                                {sub?.name === 'Damage Scenarios Derivations' && sub?.Details?.map(dt=>
                                                dt?.props?.map((pr,i)=>{
                                                    // console.log('pr',dt.name.slice(0,1), pr)
                                                    return <TreeItem key={`[${dt?.name?.split(' ').map(it=>it.slice(0,1)).join('')}000${i}]`} label={`[${dt?.name?.split(' ').map(it=>it.slice(0,1)).join('').toUpperCase()}000${i}] Damage scenenorios for ${pr}`}></TreeItem>
                                                })
                                                )}
                                               {/* {
                                               sub?.name === 'Damage Scenarios - Impact Ratings' 
                                               } */}
                                            </TreeItem>
                                                 ))
                                            }
                                            { scene?.name ==='Threat Scenarios' && scene?.Details?.map((value)=>
                                            value?.props?.map((pr,i)=>{
                                                 return <TreeItem key={`[${value?.name?.split(' ').map(it=>it.slice(0,1)).join('')}000${i}]`} label={`[${value?.name?.split(' ').map(it=>it.slice(0,1)).join('').toUpperCase()}000${i}] Threat Scenarios for ${pr}`}>
                                            </TreeItem>     
                                            }))}
                                        </TreeItem>
                                    ))}
                                </TreeItem>
                            );
                        })}
                        <TreeItem icon={<AddIcon />} onClick={handleOpenModal} label={'Add'} />
                    </TreeView>
                </CardContent>
            </CardStyle>
            <AddModal open={open} handleClose={handleClose} />

        </>
    );
};

export default BrowserCard;
