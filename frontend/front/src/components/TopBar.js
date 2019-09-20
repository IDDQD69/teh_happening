import React, {useEffect, useState, Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import data from 'data.json'
import {storeLogin, getLogin, clear} from 'storage'
import {validate} from 'api'
import isEmpty from "lodash/isEmpty";
import { Navbar, Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";
import Typography from '@material-ui/core/Typography';


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
        width: "100%",
        height: 80,
        backgroundColor: "#0088cc",
       // position: "fixed",
    },
});

export default function TopBar() {
    const classes = useStyles();
    const [login, setLogin] = useState({})

    useEffect(() => {
        setLogin(getLogin())
    }, [])

    const bar = (
        <Navbar className={classes.navigation}>
            <div>
                {login &&
                <Grid container justify="start" alignItems="center">
                    <Avatar alt="Remy Sharp" src={login.photo_url} className={classes.bigAvatar}/>
                    <Typography variant="h5" gutterBottom>
                        {login.username}
                    </Typography>
                    <Button variant="contained" color="primary" className={classes.button} style={{fontWeight:"bold", marginLeft: "auto"}}
                            onClick={() => {
                                clear()
                                setLogin({})
                                console.log("Logout")
                            }}>
                        Logout
                    </Button>
                </Grid>
                }
            </div>
        </Navbar>
    )

    return (<div>


        {!isEmpty(login) && bar}


    </div>)
}
