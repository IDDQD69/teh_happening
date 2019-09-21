import React, { useEffect, useState, useRef } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import isEmpty from 'lodash/isEmpty'

import {getLogin} from "storage";

import {
  getEvent,
  getEventParticipants,
  setParticipantStatus,
  deleteParticipant,
  createParticipant,
  getChats,
  sendChat,
  getComments,
  sendComment
} from 'api'
import CustomLink from 'components/CustomLink'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CancelIcon from '@material-ui/icons/Cancel'
import DoneIcon from '@material-ui/icons/Done'
import HelpIcon from '@material-ui/icons/Help'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import moment from "moment";

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
  userRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  selectedStatus: {
    color: 'red',
  },
  subComment: {
    marginLeft: 20,
    background: '#f1f1f1'
  }
}))

function Event(props) {
  const classes = useStyles()
  const [event, setEvent] = useState(null)
  const [input, setInput] = useState({})
  const [login, setLogin] = useState({})
  const [participants, setParticipants] = useState(null)
  const [invalidEvent, setInvalidEvent] = useState(false)
  const [userRef, setUserRef] = useState(null)

  const [messages, setMessages] = useState([])
  const [comments, setComments] = useState([])

  const eventId = props.match.params.eventId

  useEffect(() => {
    getEvent(
      eventId,
      response => {
        setEvent(response.data)
      },
      error => {
        setInvalidEvent(true)
      }
    )

    setLogin(getLogin())

  }, [])

  useEffect(() => {
    if (event) {
      getEventParticipants(event.id, response => {
        setParticipants(response.data)
      })

      getChats({login: login, id: event.id}, response => {
        setMessages(response.data)
      })

      getComments({login: login, id: event.id}, response => {
        setComments(response.data)
      })
    }

    const interval = setInterval(() => {
      if (event) {
        getEventParticipants(event.id, response => {
          setParticipants(response.data)
        })
      }
    }, 2000)

    const chatInterval = setInterval(() => {
      if (event) {
        getChats({login: login, id: event.id}, response => {
          setMessages(response.data)
        })
      }
    }, 1000)

    const commentInterval = setInterval(() => {
      if (event) {
        getComments({login: login, id: event.id}, response => {
          setComments(response.data)
        })
      }
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(chatInterval)
      clearInterval(commentInterval)
    }
  }, [event])

  const getStatusButtonClass = (participant, status) => {
    if (participant.status === status) {
      return classes.selectedStatus
    }
    return ''
  }

  const changeStatus = (participant, status) => {
    setParticipantStatus(participant, status)
    participant.status = status
    getEventParticipants(event.id, response => {
      setParticipants(response.data)
    })
  }

  const participantList = () => (
    <div>
      {participants.map(participant => (
        <div key={participant.id}>
          <div className={classes.userRow}>
            <Typography variant="h3" style={{ flex: 1 }}>
              {participant.username}
            </Typography>
            <IconButton
              className={getStatusButtonClass(participant, 3)}
              onClick={() => {
                changeStatus(participant, 3)
              }}
            >
              <CancelIcon />
            </IconButton>
            <IconButton
              className={getStatusButtonClass(participant, 2)}
              onClick={() => {
                changeStatus(participant, 2)
              }}
            >
              <HelpIcon />
            </IconButton>
            <IconButton
              className={getStatusButtonClass(participant, 1)}
              onClick={() => {
                changeStatus(participant, 1)
              }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              className={classes.button}
              onClick={() => {
                deleteParticipant(participant, () => {
                  getEventParticipants(event.id, response => {
                    setParticipants(response.data)
                  })
                })
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  )

  const handleInputChange = event => {
    event.persist()
    setInput(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }))
  }

  const eventItem = (
    <div>
      {event && (
        <div>
          <Paper className={classes.paper} style={{ flex: 1 }}>
            <TextField
              inputRef={(ref) => setUserRef(ref)}
              id="standard-full-width"
              name="username"
              label="Add username"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
            <Button
              onClick={() => {
                createParticipant(
                  {
                    event: event.id,
                    username: input['username'],
                  },
                  () => {
                    getEventParticipants(event.id, response => {
                      setParticipants(response.data)
                      userRef.value = ''
                        setInput(inputs => ({
                            ...inputs,
                            [userRef.name]: userRef.value,
                        }))
                    })
                  }
                )
              }}
            >
              add new user
            </Button>
          </Paper>
          <Paper className={classes.paper}>
            {!isEmpty(participants) && participantList()}
          </Paper>
        </div>
      )}
      {invalidEvent && <Paper className={classes.paper}>'4̸̛͚̹̩̘͖̩̟̺̣͈͇̻̒̍̽̍̑͊̈́̿0̴̨̟̘̻̽̀̄͜4̵̧̡̛͓̯̬̬̯̄̇'</Paper>}
    </div>
  )

  const eventComments = (
      <Paper className={classes.paper} style={{ flex: 1 }}>
        <div>
          {comments && comments.map(comment => {
            return <div key={comment.id}>
              <div>{moment(comment.datetime).format("YY-MM-DD HH:mm")}</div>
              <div>{comment.username}</div>
              <div>{comment.comment}</div>

              {comment.subcomments && comment.subcomments.map(sc => {
                return <div key={sc.id} className={classes.subcomment}>
                  ----
                  <div> > {moment(sc.datetime).format("YY-MM-DD HH:mm")}</div>
                  <div> > {sc.username}</div>
                  <div> > {sc.comment}</div>
                  ----
                </div>
              })}
              <div onClick={() => {

              }}>
                <TextField
                    id="reply-box"
                    label="reply"
                    margin="dense"
                    fullWidth
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            sendComment(
                                {
                                    login: login,
                                    id: event.id,
                                    target: comment.id,
                                    comment: ev.target.value
                                },
                                () => {
                                    getComments({login: login, id: event.id}, response => {
                                        setComments(response.data)
                                    })
                                }
                            )
                            ev.target.value = ''
                        }
                    }}
                />

              </div>
            </div>
          })}
        </div>
      </Paper>
  )

  const chatMessages = (
      <Paper className={classes.paper} style={{ flex: 1 }}>
      <div>
        {messages && messages.map(message => {
          return <div key={message.id}>
            <span>{moment(message.datetime).format("YY-MM-DD HH:mm")} >> </span>
            <span>{message.username}: </span>
            {message.message}
          </div>
        })}
      </div>
      </Paper>
  )

  const commentBox = (
      <Paper className={classes.paper} style={{ flex: 1 }}>
        <TextField
            id="standard-full-width"
            name="comment"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleInputChange}
        />
        <Button
            onClick={() => {
              sendComment(
                  {
                    login: login,
                    id: event.id,
                    comment: input['comment']
                  },
                  () => {
                      getComments({login: login, id: event.id}, response => {
                          setComments(response.data)
                      })
                  }
              )
            }}
        >
          Comment
        </Button>
      </Paper>
  )

  const chatBox = (
      <Paper className={classes.paper} style={{ flex: 1 }}>
        <TextField
            id="standard-full-width"
            name="message"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleInputChange}
        />
        <Button
            onClick={() => {
              sendChat(
                  {
                    login: login,
                    id: event.id,
                    message: input['message']
                  },
                  () => {
                    getEventParticipants(event.id, response => {
                      setParticipants(response.data)
                    })
                  }
              )
            }}
        >
          chat
        </Button>
      </Paper>
  )

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomLink to={'/events/'}>. . </CustomLink>/ {event && event.name}{' '}
        {invalidEvent && '(눈_눈)'}
      </Paper>
      {eventItem}
      {!isEmpty(messages) && chatMessages}
      {chatBox}

      {!isEmpty(comments) && eventComments}
      {commentBox}
    </div>
  )
}

export default Event
