import React, { useEffect, useState, useRef } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { getLogin } from 'storage'

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
    padding: theme.spacing(2),
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
  const [inputs, setInputs] = useState({})

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

  const field = (name, type = 'text') => {
    return (
      <TextField
        id="standard-full-width"
        name={name}
        label={name}
        type={type}
        style={{ margin: 8 }}
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
        {field('name')}

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="YYYY-MM-DD"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={inputs['date']}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <Button
          onClick={() => {
            create()
          }}
        >
          create
        </Button>
      </Paper>
    </div>
  )
}

export default CreateEvent
