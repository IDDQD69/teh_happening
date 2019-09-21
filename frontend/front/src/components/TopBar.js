import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  username: {
    flexGrow: 1,
    marginLeft: 10,
  },
  bigAvatar: {
    width: 50,
    height: 50,
    margin: 10,
  },
  navigation: {
    background: '#0088cc',
  },
  button: {
    fontWeight: 'bold',
  },
})

function HideOnScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

function TopBar(props) {
  const { login, handleLogout } = props
  const classes = useStyles()

  const bar = (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar className={classes.navigation}>
          <Toolbar>
            <Avatar
              edge="start"
              alt="Remy Sharp"
              src={login.photo_url}
              className={classes.bigAvatar}
            />
            <Typography className={classes.username} variant="h5" edge="end">
              {login.username}
            </Typography>
            <Button
              edge="end"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  )

  return <div className={classes.root}>{!isEmpty(login) && bar}</div>
}

export default TopBar
