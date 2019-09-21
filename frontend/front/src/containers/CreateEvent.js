import React, { useEffect, useState, useRef } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { getLogin } from 'storage'

import moment from 'moment'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CustomLink from 'components/CustomLink'

import { KeyboardDatePicker } from '@material-ui/pickers'

import { createEvent } from 'api'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    marginTop: 20,
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))

function CreateEvent(props) {
  const classes = useStyles()
  const [errors, setErrors] = useState({})
  const [inputs, setInputs] = useState({
    date: moment(),
  })

  function handleDateChange(date) {
    setInputs(inputs => ({
      ...inputs,
      date: date,
    }))
  }

  useEffect(() => {}, [])

  const create = () => {
    createEvent(
      {
        login: {
          ...getLogin(),
        },
        ...inputs,
      },
      response => {
        props.history.push('/events/' + response.data.id + '/')
      },
      error => {
        setErrors(error.data)
      }
    )
  }

  const handleInputChange = event => {
    event.persist()
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }))
  }

  const getErrorText = name => {
    if (errors && errors['name']) {
      return errors['name'][0]
    }
    return ''
  }

  const field = (name, type = 'text') => {
    return (
      <TextField
        id="standard-full-width"
        name={name}
        label={name}
        type={type}
        style={{ margin: 8 }}
        helperText={getErrorText(name)}
        error={getErrorText(name) !== ''}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleInputChange}
      />
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomLink to={'/events/'}>. . </CustomLink>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>{field('name')}</Grid>
          <Grid item xs>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="YYYY-MM-DD"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              fullWidth
              value={inputs['date']}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
            <Grid item xs>{field('url')}</Grid>
          <Grid item xs>
            <Button
              onClick={() => {
                create()
              }}
            >
              create
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default CreateEvent
