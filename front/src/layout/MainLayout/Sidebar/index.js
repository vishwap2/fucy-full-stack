import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import LogoSection from '../LogoSection';
import MenuCard from './MenuCard';
import { drawerWidth, navbarHeight } from '../../../store/constant';
import BrowserCard from './BrowserCard';
import useStore from '../../../Zustand/store';
import { useEffect, useState } from 'react';

// ==============================|| SIDEBAR DRAWER ||============================== //

const selector = (state) => ({
    nodes: state.nodes,
    template: state.template,
    modals: state.Modals,
    modal: state.modal,
    fetchAPI: state.fetchAPI,
    fetchModals: state.getModals,
    updateModal: state.updateModal

});
const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const [properties, setProperties] = useState([]);
    const { nodes, template, fetchAPI, fetchModals, modals, modal, updateModal } = useStore(selector);
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    console.log('modals', modals);
    const handleClick = (node) => {
        // console.log('node', )
        setProperties(node?.properties);
    };
    useEffect(() => {
        fetchAPI();
        fetchModals();
    }, []);


    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        marginTop: '3rem',
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <BrowserCard
                        template={template}
                        modals={modals}
                        handleClick={handleClick}
                        nodes={nodes}
                        modal={modal}
                        updateModal={updateModal}
                    />
                    <MenuCard properties={properties} />
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuCard />
                </Box>
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        // background: theme.palette.background.default,
                        background: '#eef2e2',
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: navbarHeight
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
