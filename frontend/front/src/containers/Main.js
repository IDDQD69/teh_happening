import React, {useEffect, useState} from 'react'

import TelegramLoginButton from 'react-telegram-login';

import isEmpty from 'lodash/isEmpty'

import {getEvents, validate} from 'api'
import {storeLogin, getLogin, clear} from 'storage'

// ask this from aj :)
import data from 'data.json'

function Main(props) {

    const [events, setEvents] = useState([])
    const [login, setLogin] = useState({})

    useEffect(() => {
        getEvents(response => {
            setEvents(response.data)
        })
        setLogin(data[0])
    }, [])


    useEffect(() => {
        if (!isEmpty(login)) {
            validate(login, response => {
                console.log('res', response)
            })
        }
    }, [login])

    const eventItem = event => {
        return <div key={event.id}>{event.name}</div>
    }

    const eventsList = (
        <div>
            {events.map(event => eventItem(event))}
        </div>
    )

    const handleTelegramResponse = response => {
        setLogin(response)
        storeLogin(response)
    };

    const loginButton = (
        <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName='TehHappeningBot'/>
    )

    const logout = () => {
        clear()
        setLogin({})
    }

    const logoutButton = (
        <div>
            <img src={login.photo_url} alt="me"/>
            <span>{login.username}</span>
            <div onClick={() => {logout()}}> logout </div>
        </div>
    )

    return (
        <div>
            {isEmpty(login) && loginButton}
            {!isEmpty(login) && logoutButton}
        </div>
    )
}

export default Main