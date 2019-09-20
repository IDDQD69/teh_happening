import React, {useEffect, useState} from 'react'

import TelegramLoginButton from 'react-telegram-login';

import isEmpty from 'lodash/isEmpty'

import {storeLogin} from 'storage'

// ask this from aj :)
import data from 'data.json'

function Main() {

    const [login, setLogin] = useState({})

    useEffect(() => {
        setLogin(data[0])
        storeLogin(data[0])
    }, [])


    useEffect(() => {
        if (!isEmpty(login)) {
        }
    }, [login])


    const handleTelegramResponse = response => {
        setLogin(response)
        storeLogin(response)
    };

    const loginButton = (
        <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName='TehHappeningBot'/>
    )

    return (
        <div>
            {isEmpty(login) && loginButton}
        </div>
    )
}

export default Main