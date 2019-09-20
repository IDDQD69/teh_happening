import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {storeLogin, getLogin, clear} from 'storage'
import {validate} from 'api'
import isEmpty from "lodash/isEmpty";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles({
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    navigation: {
        background: "#0088cc",
       // position: "fixed",
    },
    button: {
        fontWeight:"bold",
      //  margin: 10,
        float: "right",
    },
});

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


export default function TopBar() {
    const classes = useStyles();
    const [login, setLogin] = useState({})

    useEffect(() => {
        setLogin(getLogin())
    }, [])

    const bar = (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll>
                <AppBar className={classes.navigation}>
                    <Toolbar>
                            {login &&
                            <Grid container justify="space-between" alignItems="center">
                                <Avatar alt="Remy Sharp" src={login.photo_url} className={classes.bigAvatar}/>
                                <Typography variant="h5">
                                    {login.username}
                                </Typography>
                                <Button variant="contained" color="primary" className={classes.button}
                                        onClick={() => {
                                            clear()
                                            setLogin({})
                                            console.log("Logout")
                                        }}>
                                    Logout
                                </Button>
                            </Grid>
                            }
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </React.Fragment>

    )

    return (<div>


        {!isEmpty(login) && bar}


    </div>)
}
