import React, {useEffect, useState} from 'react'

import TelegramLoginButton from 'react-telegram-login';

import isEmpty from 'lodash/isEmpty'

import {storeLogin} from 'storage'

// ask this from aj :)
import data from 'data.json'
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

function Main() {

    const [login, setLogin] = useState({})

    useEffect(() => {
        // setLogin(data[0])
        // storeLogin(data[0])
    }, [])


    useEffect(() => {
        if (!isEmpty(login)) {
        }
    }, [login])

    const doLogin = () => {
        setLogin(data[0])
        storeLogin(data[0])
    }

    const handleTelegramResponse = response => {
        setLogin(response)
        storeLogin(response)
    };

    const loginButton = (
        <Paper>
            <TelegramLoginButton
                dataOnauth={handleTelegramResponse}
                botName='TehHappeningBot'/>
            <Button onClick={() => {doLogin()}}>Login</Button>
        </Paper>

    )

    return (
        <div>

            {isEmpty(login) && loginButton}
        </div>
    )
}

export default Main