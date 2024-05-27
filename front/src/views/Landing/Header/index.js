import React, { useState } from "react"
import { NavLink } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { AppBar, Toolbar, Box, Typography, MenuItem, Menu } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { changeCanvasPage } from "../../../store/slices/CanvasSlice";

const services = [
    'TARA Automation',
    'Vulnerability Management',
    'Cybersecurity Monitoring',
    'Manufacturing Software',
    'Consulting Service'
];

const useStyles = makeStyles(() => ({

    header: {
        background: 'rgb(0, 0, 0, 0.3)'
    },
    title: {
        flexGrow: 1,
        color: 'white',
        fontSize: '25px'
    },
    navlink: {
        textDecoration: 'none',
        color: 'white',
        fontSize: 16,
        lineHeight: '23px',

        '&.active':{
            textDecoration:'underline'
        }
    },
    dropdown: {
        color: 'white',
        fontSize: 16,
        marginLeft: '3px'
    },
    links: {
        display: 'flex',
        gap: 25,
        marginRight: 40
    },
}));
export default function Header(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen((prev) => !prev);
    };

    const handleClose = (name) => {
        if(name === 'TARA Automation'){
            dispatch(changeCanvasPage());
            window.location.href = '/Modals';
        }
        setAnchorEl(null);
        setMenuOpen(false);
    };
    return <>
                    <AppBar position="fixed" className={classes.header}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            FUCY TECH
                        </Typography>
                        <Box className={classes.links}>
                            <NavLink className={classes.navlink} to="/">
                                Home
                            </NavLink>
                            <Box>
                                <Typography className={classes.dropdown} onClick={handleClick} display="flex" alignItems="center">
                                    CSMS Solutions {menuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                </Typography>
                                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                                    {services.map((service, index) => (
                                        <MenuItem key={index} onClick={()=>handleClose(service)}>
                                            {service}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <NavLink className={classes.navlink} to="/about" >
                                About Us
                            </NavLink>
                            <NavLink className={classes.navlink} to="/career" >
                                Career
                            </NavLink>
                            <NavLink className={classes.navlink} to="/contact">
                                Contact
                            </NavLink>
                        </Box>
                    </Toolbar>
                </AppBar></>
}