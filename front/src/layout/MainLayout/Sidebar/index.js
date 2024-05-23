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
import ColorTheme from '../../../store/ColorTheme';
// import BrowserCard from './BrowserCard';
import BrowserCard from './BrowserCard/index1';
import useStore from '../../../Zustand/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// ==============================|| SIDEBAR DRAWER ||============================== //

const selector = (state) => ({
    template: state.template,
    modals: state.Modals,
    fetchAPI: state.fetchAPI,
    fetchModals: state.getModals
});
const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const [properties, setProperties] = useState([]);
    const { template, fetchAPI, fetchModals, modals } = useStore(selector);
    const theme = useTheme();
    const { isNavbarClose } = useSelector((state)=>state.currentId);
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    // console.log('modals', modals);
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
                        // marginTop: '3rem',
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        marginTop: '1.4rem'
                    }}
                >
                    <BrowserCard template={template} modals={modals} handleClick={handleClick} />
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
        <Box
            component="nav"
            sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto', background: ColorTheme().sidebarBG, mt: !isNavbarClose ? navbarHeight :'0px' }}
            aria-label="mailbox folders"
        >
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
                        background: ColorTheme().sidebarBG,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: !isNavbarClose ? navbarHeight :'0px'
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
