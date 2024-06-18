import * as React from 'react';
import { Box } from '@mui/system';
import {ArrowSquareLeft, ArrowSquareRight } from 'iconsax-react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ComponentList from '../../../views/Libraries';
import Components from '../../../views/NodeList';
import { makeStyles } from '@mui/styles';
import EditContent from '../../../ui-component/Drawer/EditContent';
import ColorTheme from '../../../store/ColorTheme';
// import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles(() => ({
    accordion: {
        width: '210px',
        backgroundColor: 'transparent',
        '&.MuiPaper-root ': {
            margin: '0px !important'
        }
    },
    arrow:{
        cursor: 'pointer',
        position: 'relative',
        right: '1.3rem', 
        top:'.2rem', 
        height: 'fit-content'
    }
}));

export default function RightDrawer({ state, drawerOpen, drawerClose, activeTab, selectedNode, modal, nodes, setNodes, setSelectedNode }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <React.Fragment>
            <Box
                sx={{
                    backgroundColor: '#e3e3e3',
                    position: 'sticky',
                    float: 'right',
                    // left: '50rem',
                    transition: 'width 0.8s',
                    width: state ? '270px' : '0px',
                    height: 'inherit',
                    zIndex: 1000,
                    display: 'flex'
                    // pr:1
                }}
            >
                {!state ? (
                    <Box
                        onClick={() => drawerOpen('library')}
                        className={classes.arrow}
                    >
                        <ArrowSquareLeft size="20px" color={ColorTheme()?.iconColor}/>
                    </Box>
                ) : (
                        <Box onClick={drawerClose} className={classes.arrow}>
                            <ArrowSquareRight size="20px" color={ColorTheme()?.iconColor} />
                        </Box>
                    )
                }
                <Box sx={{ display: state ? 'block' : 'none', width: state ? 'inherit' : '0px', overflow: 'auto', marginTop:"1rem" }}>
                    {activeTab === 'library' ? (
                        <>
                           
                                    <Accordion
                                        className={classes.accordion}
                                        expanded={expanded === 'panel1'}
                                        onChange={handleChange('panel1')}
                                    >
                                        <AccordionSummary
                                            sx={{
                                                '& .MuiAccordionSummary-content': { margin: '0px' }
                                            }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '50%', flexShrink: 0 }}> Component Library</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Components />
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion
                                        className={classes.accordion}
                                        expanded={expanded === 'panel2'}
                                        onChange={handleChange('panel2')}
                                    >
                                        <AccordionSummary
                                            sx={{ margin: '0px' }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>System Library</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ComponentList />
                                        </AccordionDetails>
                                    </Accordion>
                                
                        </>
                    ) : (
                        <EditContent 
                        selectedNode={selectedNode} 
                        modal={modal} 
                        nodes={nodes}
                        setNodes={setNodes}
                        setSelectedNode={setSelectedNode}/>
                    )}
                </Box>
            </Box>
        </React.Fragment>
    );
}
