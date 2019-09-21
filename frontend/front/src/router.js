import React, {useState, useEffect} from 'react'


import {Redirect} from 'react-router-dom'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import {clear, getLogin} from 'storage'

import isEmpty from 'lodash/isEmpty'


import {storeLogin} from 'storage'

import data from 'data.json'

import Events from 'containers/Events'
import Event from 'containers/Event'
import CreateEvent from 'containers/CreateEvent'
import TopBar from 'components/TopBar'

import {makeStyles} from '@material-ui/core/styles'
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TelegramLoginButton from "react-telegram-login";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';




const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {},
    toolbar: theme.mixins.toolbar,
    login: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    signin: {
        padding:'10%',
        align: 'center',
        justify: 'center',
        margin: 'auto'
    },
}))

function AppRouter(props) {
    const {} = props
    const classes = useStyles()
    const [login, setLogin] = useState({})

    useEffect(() => {
        setLogin(getLogin())
    }, [])


    const doLogin = (index) => {
        storeLogin(data[index])
        setLogin(data[index])
    }

    const handleTelegramResponse = response => {
        setLogin(response)
        storeLogin(response)
        props.history.push('/events/')

    }

    const telegramLogin = (
        <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName='TehHappeningBot'/>
    )

    const loginButtons = (props) => {
        return (
            <div>
                <List component="nav" aria-label="main mailbox folders">
                    {data.map((user, i) => {
                        return <ListItem button key={i} onClick={() => {
                            doLogin(i)
                            props.history.push("/events/")
                            }}>
                            <Avatar edge="start"
                                    alt="Remy Sharp"
                                    src={user.photo_url}
                                    className={classes.bigAvatar}
                            />
                            Login {user.username}

                        </ListItem>
                    })}
                </List>
            </div>
        )
    }


    const loginComponent = (props) => {
        console.log('props', props)
        return<Paper className={classes.login}><Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper} >
                <div className={classes.signin}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                </div>
                {loginButtons()}
            </div>
            <Box mt={8}>
            </Box>
        </Container>
        </Paper>
    }

    const handleLogout = () => {
        clear()
        setLogin({})
    }


    return (
        <Router>
            <div>
                <TopBar login={login} handleLogout={handleLogout}/>
                <main className={classes.content}>
                    <Route path="/" component={loginComponent}/>
                    {!isEmpty(login) && <div>
                        <div className={classes.toolbar}/>
                        <Route path="/event/new" exact component={CreateEvent}/>
                        <Route path="/events" exact component={Events}/>
                        <Route path="/events/:eventId" exact component={Event}/>
                    </div>}
                </main>
            </div>
        </Router>
    )

}

export default AppRouter
