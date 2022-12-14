import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Groups2Icon from '@mui/icons-material/Groups2';
import React, {useEffect} from "react";
import { parseCookies } from 'nookies'
import {AppBar} from "../molecules/AppBar";
import {GlobalTitle} from "../molecules/GlobalTitle";
import {Drawer} from "../molecules/Drawer";
import Link from "next/link";
import {LinkMenuItem} from "../molecules/LinkMenuItem";
import {setCustomAttribute} from "../utils/newrelic-browser";

export const GlobalNavigation = () => {

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(()=>{
        const cookies = parseCookies()
        setCustomAttribute('userId', cookies.userId || -1)
    }, [])
    return (<>
        <AppBar position="absolute" open={open}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <GlobalTitle />
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <LinkMenuItem href={'/dashboard'} label={'Dashboard'} icon={<DashboardIcon />} />
                <LinkMenuItem href={'/owners'} label={'Owners'} icon={<Groups2Icon />} />
            </List>
        </Drawer>
    </>)
}