import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core'
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Mail as MailIcon, PowerSettingsNew as PowerIcon, Home as HomeIcon, Notifications as NotificationsIcon, RateReview as RateReviewIcon, AssignmentTurnedIn as AssignmentIcon, Info as InfoIcon, ContactSupport as ContactIcon, Image as GalleryIcon, Launch as LaunchIcon } from '@material-ui/icons'

import UserContext from '../context/UserContext'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        backgroundColor: '#1a73e8'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
}))

const Navbar = props => {
    const classes = useStyles()
    const theme = useTheme()

    const [open, setOpen] = useState(false)
    const handleDrawerOpen = () => setOpen(true)
    const handleDrawerClose = () => setOpen(false)

    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const handleAlertClose = () => setIsAlertOpen(false)

    const user = useContext(UserContext)

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        LIL Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography variant="h6">Admin</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                {!user.user.token &&
                    <Typography variant="h6" noWrap>
                        Sign In First
                    </Typography>
                }
                {user.user.token &&
                    <>
                        <List>
                            <ListItem component={NavLink} to="/home" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary='Home' />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem>
                                <ListItemText secondary='Requests' />
                            </ListItem>
                            <ListItem component={NavLink} to="/demo" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <NotificationsIcon />
                                </ListItemIcon>
                                <ListItemText primary='Demo Requests' />
                            </ListItem>
                            <ListItem component={NavLink} to="/contactus" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary='Contact Us' />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem>
                                <ListItemText secondary='Customize Site' />
                            </ListItem>
                            <ListItem component={NavLink} to="/testimonials" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <RateReviewIcon />
                                </ListItemIcon>
                                <ListItemText primary='Testimonials' />
                            </ListItem>
                            <ListItem component={NavLink} to="/courses" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary='Courses' />
                            </ListItem>
                            <ListItem component={NavLink} to="/aboutus" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary='About Us' />
                            </ListItem>
                            <ListItem component={NavLink} to="/contactdetails" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <ContactIcon />
                                </ListItemIcon>
                                <ListItemText primary='Contact Details' />
                            </ListItem>
                            <ListItem component={NavLink} to="/gallery" onClick={handleDrawerClose}>
                                <ListItemIcon>
                                    <GalleryIcon />
                                </ListItemIcon>
                                <ListItemText primary='Gallery' />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem onClick={() => {
                                handleDrawerClose()
                                setIsAlertOpen(true)
                            }} button>
                                <ListItemIcon>
                                    <PowerIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sign Out" />
                            </ListItem>
                        </List>
                    </>
                }
                <List>
                    <ListItem component="a" href="https://google.com" target="_blank" onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <LaunchIcon />
                        </ListItemIcon>
                        <ListItemText primary='Live Site' />
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div>
                    {props.children}
                </div>
            </main>
            {user.user.token &&
                <Dialog
                    open={isAlertOpen}
                    onClose={handleAlertClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to Sign Out?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleAlertClose} color="primary" autoFocus>
                            No
                    </Button>
                        <Button onClick={() => {
                            handleAlertClose()
                            user.logout()
                        }} color="secondary">
                            Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            }
        </div>
    )
}

export default Navbar