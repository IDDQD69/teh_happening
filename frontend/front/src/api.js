import Axios from 'axios'

const getAxios = () => {
  const ca = Axios.create({})
  return ca
}

export const getEvents = callback => {
  getAxios()
    .get('/event/')
    .then(response => {
      callback(response)
    })
}

export const getOwnEvents = (login, callback) => {
  getAxios()
    .post('/event/own/', login)
    .then(response => {
      callback(response)
    })
}

export const createEvent = (data, callback, error) => {
  getAxios()
    .post('/event/', data)
    .then(response => {
      callback(response)
    })
    .catch(err => {
      if (error) {
        error(err.response || err)
      }
    })
}

export const sendChat = (data, callback) => {
  getAxios()
    .post('/chat/', data)
    .then(response => {
      callback(response)
    })
}

export const getChats = (data, callback) => {
  getAxios()
    .post('/chat/get/', data)
    .then(response => {
      callback(response)
    })
}

export const sendComment = (data, callback) => {
  getAxios()
    .post('/comment/', data)
    .then(response => {
      callback(response)
    })
}

export const getComments = (data, callback) => {
  getAxios()
    .post('/comment/get/', data)
    .then(response => {
      callback(response)
    })
}

export const getEvent = (eventId, callback, error) => {
  getAxios()
    .get('/event/' + eventId + '/')
    .then(response => {
      callback(response)
    })
    .catch(err => {
      if (error) {
        error(err)
      }
    })
}

export const getEventParticipants = (eventId, callback) => {
  getAxios()
    .get('/event/' + eventId + '/participants/')
    .then(response => {
      callback(response)
    })
}

export const setParticipantStatus = (participant, status, callback) => {
  getAxios()
    .post('/participant/set_status/', {
      id: participant.id,
      status: status,
    })
    .then(response => {
      if (callback) callback(response)
    })
}

export const deleteParticipant = (participant, callback) => {
  getAxios()
    .delete('/participant/' + participant.id + '/')
    .then(response => {
      if (callback) callback(response)
    })
}

export const createParticipant = (data, callback) => {
  getAxios()
    .post('/participant/', data)
    .then(response => {
      if (callback) callback(response)
    })
}

export const validate = (login, callback) => {
  getAxios()
    .post('/telegram/validate/', login)
    .then(response => {
      callback(response)
    })
}

export const deleteEvent = (event, callback) => {
  getAxios()
    .delete(`/event/${event.id}/`)
    .then(response => {
      callback(response)
    })
}
