// material-ui
import {
    styled
    // , useTheme
} from '@mui/material/styles';
import {
    Card,
    CardContent,
    Typography
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
import { AttackTreePageOpen, DsTableClose, DsTableOpen,TsTableClose, TsTableOpen, setAttackScene } from '../../../../store/slices/CurrentIdSlice';
import { useDispatch } from 'react-redux';

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

// ==============================|| SIDEBAR MENU Card ||============================== //

const BrowserCard = ({ modals, template, handleClick, nodes }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('nodes', nodes);
    const [ModalDetails, setModalDetails] = useState([]);
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
        dispatch(DsTableClose());
        dispatch(TsTableClose());
        // console.log('id', id)
    };
    console.log('ModalDetails', ModalDetails);
    const handleSwicthDsTable = () => {
        console.log('clicked');
        dispatch(DsTableOpen());
    };

    const handleSwicthTsTable = () => {
        // console.log('clicked');
        dispatch(TsTableOpen());
    };

    const handleOpenActionTree =()=>{
        console.log("attack tree")
        dispatch(AttackTreePageOpen())
    }

    const handleAttackTree = (at_scene)=>{
        // console.log('at_scene', at_scene);
        dispatch(setAttackScene(at_scene));
    }
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
                                                {scene?.name === 'Item Modal & Assets' &&
                                                    scene?.Details?.map((value, i) => (
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

                                                {scene?.name === 'Damage Scenarios Identification and Impact Ratings' &&
                                                    scene?.subs?.map((sub) => (
                                                        <TreeItem
                                                            key={`1${sub?.name}`}
                                                            nodeId={`1${sub?.name}`} //change to id
                                                            label={sub?.name}
                                                            onDoubleClick={handleSwicthDsTable}
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
                                                        </TreeItem>
                                                    ))}
                                                {scene?.name === 'Threat Scenarios Identification' &&
                                                scene?.subs?.map((sub) => (
                                                    <TreeItem
                                                        key={`1${sub?.name}`}
                                                        nodeId={`1${sub?.name}`}
                                                        label={sub?.name}
                                                        onDoubleClick={handleSwicthTsTable}
                                                    >
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
                                                        {sub?.name === 'Derived Threat Scenarios' &&
                                                            sub?.scenes?.map((th_scene) => {
                                                                return (
                                                                    <TreeItem
                                                                        key={th_scene?.id}
                                                                        nodeId={th_scene?.id}
                                                                        label={th_scene?.name}
                                                                    >
                                                        
                                                                    </TreeItem>
                                                                );
                                                            })}
                                                    </TreeItem>
                                                    
                                                ))}
                                                {scene?.name === 'Attack Path Analysis and Attack Feasability Rating' &&
                                                scene?.subs?.map((sub) =>{ 
                                                    // console.log('sub', sub)
                                                    return(
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
                                                                        onClick={()=>handleAttackTree(at_scene)}
                                                                    >
                                                        
                                                                    </TreeItem>
                                                                );
                                                            })}
                                                    </TreeItem>
                                                    
                                                )}
                                                )}

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
