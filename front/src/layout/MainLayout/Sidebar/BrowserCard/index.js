// material-ui
import {
    styled
    // , useTheme
} from '@mui/material/styles';
import { Card, CardContent, Menu, MenuItem, Typography } from '@mui/material';
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
import { AttackTreePageOpen, DsTableOpen, TsTableOpen, closeAll, cyberBlockOpen, setAttackScene } from '../../../../store/slices/CurrentIdSlice';
import { useDispatch } from 'react-redux';
import CyberSecurityModal from '../../../../ui-component/Modal/CyberSecurityModal';
import { makeStyles } from '@mui/styles';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
            right: '-96px'
        }
    })
);

const useStyles = makeStyles((theme) => ({
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 0),
        
      },
     labelTypo:{
        fontSize:12,
        fontWeight:600
     } 
    }));
// ==============================|| SIDEBAR MENU Card ||============================== //

const BrowserCard = ({ modals, template, handleClick, nodes }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('nodes', nodes);
    const [name, setName] = useState('');
    const [ModalDetails, setModalDetails] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openCyberModal, setOpenCyberModal ] = useState(false);
    const openRight = Boolean(anchorEl);


    const openAddModal = (name)=>{
        console.log('name', name);
        setAnchorEl(null)
        setName(name);
        setOpenCyberModal(true)
    }
    const handleCloseCyberModal = () => {
        setOpenCyberModal(false)
        setName('');
    }
    const handleCloseRight = () => {
        setAnchorEl(null);
    };
    // const [Modal,setModal] = useState([]);
    const [open, setOpen] = useState(false);

    console.log('template', template);

    useEffect(() => {
        setModalDetails(modals);
    }, [modals]);
    // const theme = useTheme();
    const handleOpenModal = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleNavigate = (id) => {
        navigate(`/Modals/${id}`, { replace: true });
        dispatch(closeAll());
    };
    const handleSwicthDsTable = (name) => {
        console.log('name', name);
        if (name.includes('Damage')) {
            dispatch(DsTableOpen());
        }
        if (name.includes('Threat')) {
            dispatch(TsTableOpen());
        }
        if (name.includes('CyberSecurity')) {
            dispatch(cyberBlockOpen());
        }
        
    };

    // const handleSwicthTsTable = () => {
    //     // console.log('clicked');
    // };

    const handleOpenActionTree = () => {
        dispatch(AttackTreePageOpen());
    };

    const handleAttackTree = (at_scene) => {
        // console.log('at_scene', at_scene);
        dispatch(setAttackScene(at_scene));
    };

    const handleRightClick = (e, name) => {
        console.log('e', e);
        e.preventDefault();
        if (name.toLowerCase().includes('cybersecurity')) {
            setAnchorEl(name);
        }
    };

    const onDragStart = (event, item) => {
        console.log('event', event);
        console.log('item', item)
        const parseFile = JSON.stringify(item);
        event.dataTransfer.setData("application/cyber", parseFile);
        event.dataTransfer.effectAllowed = "move";
      };
    

    return (
        <>
            <Typography variant="h4">Modals</Typography>
            <CardStyle sx={{ overflowY: 'auto' }}>
                <CardContent sx={{ p: 2 }}>
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {ModalDetails &&
                            ModalDetails?.map((modal) => {
                                // console.log('item', Object.values(modal?.scenarios))
                                return (
                                    <TreeItem
                                        key={modal?.id}
                                        nodeId={modal?.id}
                                        label={modal?.name}
                                        onClick={() => handleNavigate(modal?.id)}
                                    >
                                        {modal?.scenarios?.map((scene) => (
                                            <TreeItem
                                                key={scene?.name}
                                                nodeId={scene?.id}
                                                label={scene?.name}
                                                onClick={() => handleClick(scene)}
                                                sx={{
                                                    '& .MuiTreeItem-label': {
                                                        fontSize: '12px',
                                                        fontWeight: 600,
                                                        my: 0.2
                                                    }
                                                }}
                                            >
                                                {scene?.subs
                                                    ? !scene?.name.includes('Attack Path') &&
                                                      scene?.subs?.map((sub) => (
                                                          <TreeItem
                                                              key={`1${sub?.name}`}
                                                              nodeId={`1${sub?.name}`} //change to id
                                                              label={sub?.name}
                                                              onDoubleClick={() => handleSwicthDsTable(sub?.name)}
                                                              onContextMenu={(e) => handleRightClick(e, sub?.name)}
                                                          >
                                                              {sub?.name === 'Damage Scenarios Derivations' &&
                                                                  sub?.Details?.map((dt) =>
                                                                      dt?.props?.map((pr, i) => {
                                                                          // console.log('pr',dt.name.slice(0,1), pr)
                                                                          return (
                                                                              <TreeItem
                                                                                  key={`[${dt?.name
                                                                                      ?.split(' ')
                                                                                      .map((it) => it.slice(0, 1))
                                                                                      .join('')}000${i}]`}
                                                                                  nodeId={`[${dt?.name
                                                                                      ?.split(' ')
                                                                                      .map((it) => it.slice(0, 1))
                                                                                      .join('')}000${i}]`}
                                                                                  label={`[${dt?.name
                                                                                      ?.split(' ')
                                                                                      .map((it) => it.slice(0, 1))
                                                                                      .join('')
                                                                                      .toUpperCase()}000${i}] Damage scenenorios for ${pr}`}
                                                                              ></TreeItem>
                                                                          );
                                                                      })
                                                                  )}
                                                              {sub?.name === 'Damage Scenarios - Impact Ratings' &&
                                                                  sub?.scenes?.map((dm_scene) => {
                                                                      return (
                                                                          <TreeItem
                                                                              key={dm_scene?.id}
                                                                              nodeId={dm_scene?.id}
                                                                              label={dm_scene?.name}
                                                                          >
                                                                              {dm_scene?.losses.map((dm) => (
                                                                                  <TreeItem
                                                                                      key={dm?.name}
                                                                                      nodeId={dm?.name}
                                                                                      label={dm?.name}
                                                                                  ></TreeItem>
                                                                              ))}
                                                                          </TreeItem>
                                                                      );
                                                                  })}
                                                              {sub?.name === 'Threat Scenarios' &&
                                                                  sub?.Details?.map((dt) =>
                                                                      dt?.props?.map((pr, i) => {
                                                                          // console.log('pr',dt.name.slice(0,1), pr)
                                                                          return (
                                                                              <TreeItem
                                                                                  key={`[${dt?.name
                                                                                      ?.split(' ')
                                                                                      .map((it) => it.slice(0, 1))
                                                                                      .join('')}000${i}]`}
                                                                                  nodeId={`[${dt?.name
                                                                                      ?.split(' ')
                                                                                      .map((it) => it.slice(0, 1))
                                                                                      .join('')}000${i}]`}
                                                                                  label={`[${dt?.name
                                                                                      ?.split(' ')
                                                                                      .map((it) => it.slice(0, 1))
                                                                                      .join('')
                                                                                      .toUpperCase()}000${i}] Threat scenenorios for ${pr}`}
                                                                              ></TreeItem>
                                                                          );
                                                                      })
                                                                  )}
                                                                  {sub?.name === 'CyberSecurity Goals and Requirements' && 
                                                                   sub?.goals.map(goal=>
                                                                    <TreeItem
                                                                    key={goal?.id}
                                                                    nodeId={goal?.id}
                                                                    // label={goal?.name}
                                                                    label={
                                                                        <div className={classes.labelRoot}>
                                                                          <BrightnessLowIcon color="inherit" sx={{fontSize:16}}/>
                                                                          <Typography variant="body2" ml={0.5} className={classes.labelTypo} >
                                                                          {goal?.name}
                                                                          </Typography>
                                                                        </div>
                                                                      }
                                                                ></TreeItem>
                                                                   )
                                                                }
                                                                  {sub?.name === 'CyberSecurity Goals and Requirements' && 

                                                                sub?.requirements.map(req=>
                                                                 <TreeItem
                                                                 key={req?.id}
                                                                 nodeId={req?.id}
                                                                 label={
                                                                    <div className={classes.labelRoot} 
                                                                    onDragStart={(event) => onDragStart(event, req)}
                                                                    draggable
                                                                    >
                                                                      <CalendarMonthIcon color="inherit" sx={{fontSize:16}} />
                                                                      <Typography variant="body2" ml={0.5} className={classes.labelTypo}>
                                                                      {req?.name}
                                                                      </Typography>
                                                                    </div>
                                                                  }
                                                             ></TreeItem>
                                                                )
                                                                }
                                                              {sub?.name === 'Derived Threat Scenarios' &&
                                                                  sub?.scenes?.map((th_scene) => {
                                                                      return (
                                                                          <TreeItem
                                                                              key={th_scene?.id}
                                                                              nodeId={th_scene?.id}
                                                                              label={th_scene?.name}
                                                                          ></TreeItem>
                                                                      );
                                                                  })}
                                                              {sub?.name === 'Derived Threat Scenarios' &&
                                                                  sub?.scenes?.map((th_scene) => {
                                                                      return (
                                                                          <TreeItem
                                                                              key={th_scene?.id}
                                                                              nodeId={th_scene?.id}
                                                                              label={th_scene?.name}
                                                                          ></TreeItem>
                                                                      );
                                                                  })}
                                                          </TreeItem>
                                                      ))
                                                    : scene?.Details?.map((value, i) => (
                                                          <TreeItem key={`1${i}`} nodeId={`1${i}`} label={`[000${i}] ${value?.name}`}>
                                                              {value?.props.map((pr) => (
                                                                  <TreeItem
                                                                      key={value?.name}
                                                                      nodeId={value?.name}
                                                                      label={
                                                                          <div
                                                                              style={{
                                                                                  display: 'flex',
                                                                                  alignItems: 'center',
                                                                                  marginLeft: '-31px',
                                                                                  gap: 2
                                                                              }}
                                                                          >
                                                                              <CircleRoundedIcon sx={{ color: 'red', fontSize: 13 }} />
                                                                              {`Loss of ${pr}`}
                                                                          </div>
                                                                      }
                                                                  ></TreeItem>
                                                              ))}
                                                          </TreeItem>
                                                      ))}
                                                {scene?.name === 'Attack Path Analysis and Attack Feasability Rating' &&
                                                    scene?.subs?.map((sub) => {
                                                        // console.log('sub', sub)
                                                        return (
                                                            <TreeItem
                                                                key={`2${sub?.name}`}
                                                                nodeId={`2${sub?.name}`}
                                                                label={sub?.name}
                                                                onDoubleClick={handleOpenActionTree}
                                                            >
                                                                {sub?.scenes?.map((at_scene) => {
                                                                    return (
                                                                        <TreeItem
                                                                            key={at_scene?.id}
                                                                            nodeId={at_scene?.id}
                                                                            label={at_scene?.name}
                                                                            onClick={() => handleAttackTree(at_scene)}
                                                                        ></TreeItem>
                                                                    );
                                                                })}
                                                            </TreeItem>
                                                        );
                                                    })}
                                            </TreeItem>
                                        ))}
                                    </TreeItem>
                                );
                            })}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openRight}
                            onClose={handleCloseRight}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button'
                            }}
                            sx={{
                             '& .MuiPaper-root':{
                                top:'22rem !important',
                                left:'14rem !important'
                             }
                            }}
                        >
                            <MenuItem onClick={()=>openAddModal('Goals')}>Add Goals</MenuItem>
                            <MenuItem onClick={()=>openAddModal('Require')}>Add Requirements</MenuItem>
                        </Menu>
                        <TreeItem icon={<AddIcon />} onClick={handleOpenModal} label={'Add'} />
                    </TreeView>
                </CardContent>
            </CardStyle>
            <AddModal open={open} handleClose={handleClose} />
            <CyberSecurityModal open={openCyberModal} handleClose={handleCloseCyberModal} name={name} />
        </>
    );
};

export default BrowserCard;
