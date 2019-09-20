import Axios from 'axios'

const getAxios = () => {
    const ca = Axios.create({})
    return ca
}

export const getEvents = (callback) => {
    getAxios()
        .get('/event/')
        .then(
            response => {
                callback(response)
            })
}

export const createEvent = (data, callback, error) => {
    getAxios()
        .post('/event/', data)
        .then(
            response => {
                callback(response)
            })
        .catch(err => {
            if (error) {
                error(err)
            }
        })
}

export const getEvent = (eventId, callback, error) => {
    getAxios()
        .get('/event/' + eventId + '/')
        .then(
            response => {
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
        .then(
            response => {
                callback(response)
            })
}

export const validate = (login, callback) => {
    getAxios()
        .post('/telegram/validate/', login)
        .then(
            response => {
                callback(response)
            })
}

export const deleteEvent = (event, callback) => {
    getAxios()
        .delete(`/event/${event.id}/`)
        .then(
            response => {
                callback(response)
            })

}