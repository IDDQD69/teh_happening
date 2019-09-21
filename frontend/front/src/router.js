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
import TopBar from "components/TopBar";

import {makeStyles} from '@material-ui/core/styles'
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TelegramLoginButton from "react-telegram-login";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {},
    toolbar: theme.mixins.toolbar,
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
            <Paper>
                {data.map((user, i) => {
                    return <Button key={i} onClick={() => {
                        doLogin(i)
                        props.history.push("/events/")
                    }}>Login {user.username}</Button>
                })}
            </Paper>
        )
    }


    const loginComponent = (props) => {
        console.log('props', props)
        return <div>
            {isEmpty(login) && loginButtons(props)}
        </div>
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