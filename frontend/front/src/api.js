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

export const validate = (login, callback) => {
    getAxios()
        .post('/telegram/validate/' ,login)
        .then(
            response => {
                callback(response)
            })
}