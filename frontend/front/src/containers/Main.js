import React, {useEffect, useState} from 'react'

import {getEvents } from 'api'

function Main(props) {

    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents(response => {
            setEvents(response.data)
        })
    }, [])

    const eventItem = event => {
        return <div key={event.id}>{event.name}</div>
    }

    const eventsList = (
        <div>
            {events.map(event => eventItem(event))}
        </div>
    )

    return(<div>{eventsList}</div>)
}

export default Main