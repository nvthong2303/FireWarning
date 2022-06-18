import {
    AppBar,
    Avatar,
    Typography,
    Button,
    Popover,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useState } from 'react';
import IotLogo from '../assets/icon.webp';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
        grow: {
            flexGrow: 1
        },
        appBar: {
            borderBottom: '3px solid #000000',
            height: 60
        },
        toolBar: {
            display: 'flex',
            minHeight: '0px !important',
            justifyContent: 'space-between'
        },
        btnUser: {
            color: '#000000 !important',
            borderRadius: `30px !important`,
            marginRight: '3px !important',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'hsla(0,0%,95%,.8) !important'
            },
            marginTop: '5px',
            marginRight: '25px',
            backgroundColor: '#fff !important'
        },
    }),
  { index: 1 }
);

function HomeHeader() {
  const classes = useStyles();
  const [username, setUsername] = useState(localStorage.getItem('x_iot_user'));
  const [anchorElMenuUser, setAnchorElMenuUser] = useState(null);

  const open = Boolean(anchorElMenuUser);

    function logout(){
        localStorage.removeItem('x_access_token');
        localStorage.removeItem('x_iot_user');
        localStorage.removeItem('x_iot_isAdmin');
        window.location = '/Login';
    }

    const handleCloseMenuUser = () => setAnchorElMenuUser(null)

    const handleOpenMenuUser = (event) => {
        setAnchorElMenuUser(event.currentTarget);
    }

    const menuUserItem = [
        {
            label: 'Log out',
            icon: <i className="far fa-sign-out"></i>,
            onClick: () => logout()
        },
        {
            label: 'Settings',
            icon: <i className="fas fa-cog"></i>,
            onClick: () => {}
        }
    ]

    return (
        <div className={classes.grow}>
            <AppBar
                classes={{ root: classes.appBar }}
                position="fixed"
                color="inherit"
                style={{ backgroundColor: '#fff' }}
            >
                <Toolbar classes={{ root: classes.toolBar }}>
                    {/* left header */}
                    <div style={{ display: 'flex', alignItems: 'inherit' }}>
                        <Avatar 
                            style={{ 
                                cursor: 'pointer',
                                marginTop: '8px'
                            }}
                            src={IotLogo}
                        />
                        <Typography 
                            variant="h6" 
                            component="h1" 
                            style={{ 
                                cursor: 'pointer',
                                marginTop: '8px',
                                marginLeft: '10px'
                            }}
                        >
                            Fire alarm system
                        </Typography>
                    </div>

                    {/* center header */}
                    
                    {/* right header */}
                    <div style={{ display: 'flex', alignItems: 'inherit' }}>
                        <Button
                            classes={{ root: classes.btnUser }}
                            size="small"
                            onClick={(e) => handleOpenMenuUser(e)}
                        >
                            <Avatar 
                                style={{ 
                                    cursor: 'pointer'
                                }} 
                            />
                            <Typography 
                                variant="h6" 
                                component="h1" 
                                style={{ 
                                    cursor: 'pointer',
                                    marginLeft: '10px'
                                }}
                            >
                                {username}
                            </Typography>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>

            <Popover
                id={'popoverUser'}
                open={open}
                anchorEl={anchorElMenuUser}
                onClose={handleCloseMenuUser}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                sx={{
                    width: '120px'
                }}
            >
                <List
                    sx={{
                        bgcolor: 'background.paper',
                        padding: 2
                    }}
                >
                    {menuUserItem.map(item => (
                        <ListItem
                            style={{ borderRadius: 6, marginBottom: '5px' }}
                            button
                            dense={true}
                            onClick={item.onClick}
                        >
                            {item.icon}
                            <Typography 
                                    variant="subtitle1" 
                                    style={{ 
                                        cursor: 'pointer',
                                        marginLeft: '8px'
                                    }}
                                >
                                    {item.label}
                                </Typography>
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </div>
    );
}

export default HomeHeader;