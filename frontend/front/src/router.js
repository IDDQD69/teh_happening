import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { clear, getLogin } from 'storage'

import isEmpty from 'lodash/isEmpty'

import { storeLogin } from 'storage'

import data from 'data.json'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import Events from 'containers/Events'
import Event from 'containers/Event'
import CreateEvent from 'containers/CreateEvent'
import TopBar from 'components/TopBar'

import { makeStyles } from '@material-ui/core/styles'
import TelegramLoginButton from 'react-telegram-login'
import { validate } from 'api'

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
  const [open, setOpen] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setLogin(getLogin())
  }, [])

  const validateSnackBar = (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open && !isEmpty(login)}
      autoHideDuration={6000}
      onClose={() => {
        setOpen(false)
      }}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={
        <span id="message-id">
          welcome {login.username}.{!isValid && <span> INVALID USER </span>}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={() => {
            setOpen(false)
          }}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )

  const doLogin = index => {
    console.log('valid')
    storeLogin(data[index])
    setLogin(data[index])
    validate(getLogin(), response => {
      setIsValid(response.data.valid)
      setOpen(true)
    })
  }

  const handleTelegramResponse = response => {
    setLogin(response)
    storeLogin(response)
    props.history.push('/events/')
  }

  const telegramLogin = (
    <TelegramLoginButton
      dataOnauth={handleTelegramResponse}
      botName="TehHappeningBot"
    />
  )

  const loginButtons = props => {
    return (
      <Paper>
        {data.map((user, i) => {
          return (
            <Button
              key={i}
              onClick={() => {
                doLogin(i)
                props.history.push('/events/')
              }}
            >
              Login {user.username}
            </Button>
          )
        })}
      </Paper>
    )
  }

  const loginComponent = props => {
    console.log('props', props)
    return <div>{isEmpty(login) && loginButtons(props)}</div>
  }

  const handleLogout = () => {
    clear()
    setLogin({})
  }

  return (
    <Router>
      <div>
        {validateSnackBar}
        <TopBar login={login} handleLogout={handleLogout} />
        <main className={classes.content}>
          <Route path="/" component={loginComponent} />
          {!isEmpty(login) && (
            <div>
              <div className={classes.toolbar} />
              <Route path="/event/new" exact component={CreateEvent} />
              <Route path="/events" exact component={Events} />
              <Route path="/events/:eventId" exact component={Event} />
            </div>
          )}
        </main>
      </div>
    </Router>
  )
}

export default AppRouter
