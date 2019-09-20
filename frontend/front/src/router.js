import React, {useState, useEffect} from 'react'


import {Redirect} from 'react-router-dom'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import {clear, getLogin} from 'storage'

import isEmpty from 'lodash/isEmpty'


import Main from 'containers/Main'
import Events from 'containers/Events'
import Event from 'containers/Event'
import CreateEvent from 'containers/CreateEvent'
import TopBar from "components/TopBar";

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {},
    toolbar: theme.mixins.toolbar,
}))

function RedirectComponent(props) {
    return <Redirect to="/"/>
}


function EventsRedirectComponent(props) {
    if (props.location.pathname === '/') {
        return <Redirect to="/events/" />
    }
    return <div />
}

function AppRouter(props) {
    const classes = useStyles()
    const [login, setLogin] = useState({})
    const [forwardToLogin, setForwardToLogin] = useState(false)

    useEffect(() => {
        setLogin(getLogin())
    })

    const handleLogout = () => {
        clear()
        setLogin({})
        setForwardToLogin(true)
    }

    return (
        <Router>
            <div>
                {forwardToLogin && <Route component={RedirectComponent}/>}
                {!isEmpty(login) && <Route component={EventsRedirectComponent}/>}
                <TopBar login={login} handleLogout={handleLogout}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Route path="/" exact component={Main}/>
                    <Route path="/events" exact component={Events}/>
                    <Route path="/event/new" exact component={CreateEvent}/>
                    <Route path="/events/:eventId" exact component={Event}/>
                </main>
            </div>
        </Router>
    )

}

export default AppRouter