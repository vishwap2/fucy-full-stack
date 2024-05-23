import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
// eslint-disable-next-line react-hooks/exhaustive-deps
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from '../../ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import navigation from '../../menu-items';
import { navbarHeight, drawerWidth } from '../../store/constant';
import ColorTheme from '../../store/ColorTheme';
import { SET_MENU } from '../../store/actions';

// assets
import { IconChevronRight } from '@tabler/icons';
import { ArrowSquareDown } from 'iconsax-react';
import { navbarSlide } from '../../store/slices/CurrentIdSlice';
// import Customization from '../Customization';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, isNavbarClose }) => ({
    ...theme.typography.mainContent,
    background: ColorTheme().canvasBG,
    border: '1px solid gray',
    maxWidth: 'auto',
    marginTop: !isNavbarClose ? navbarHeight : '0px',
    minHeight: !isNavbarClose ? `60svh` : `100svh`,
    height:!isNavbarClose ? `80svh`:`auto`,
    marginRight: 0,
    ...(!open && {
        borderRadius: 0,
        // borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            // marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        // borderBottomLeftRadius: 0,
        // borderBottomRightRadius: 0,
        borderRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const { isNavbarClose, isDark } = useSelector((state) => state.currentId);

    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
    }, [matchDownMd]);

    console.log('isNavbarClose', isNavbarClose);

    return (
        <Box sx={{ display: 'flex', height:'80svh' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: ColorTheme().navBG,
                    height: !isNavbarClose ? navbarHeight : '0px',
                    border: '1px solid',
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                {/* ----------------- Navbar ------------------- */}
                <Toolbar sx={{ border: '1px solid', display: isNavbarClose ? 'none' : 'flex', transition: 'display 0.8s' }}>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
                {isNavbarClose && (
                    <Box display="flex" justifyContent="end" onClick={() => dispatch(navbarSlide())}>
                        <ArrowSquareDown size="20" color={isDark ? 'white':'black'} />
                    </Box>
                )}
            </AppBar>

            {/*-------------------- drawer/sidebar ---------------------*/}
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

            {/* -------------------- main content -------------------------*/}
            <Main theme={theme} open={leftDrawerOpened} isNavbarClose={isNavbarClose}>
                {/* breadcrumb */}
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                <Outlet />
            </Main>
        </Box>
    );
};

export default MainLayout;
