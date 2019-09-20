import React, {useEffect, useState, useRef} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import isEmpty from 'lodash/isEmpty'

import {getEvent, getEventParticipants} from 'api'
import CustomLink from 'components/CustomLink'
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";


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
}));


function Event(props) {
    const classes = useStyles();
    const [event, setEvent] = useState(null)
    const [participants, setParticipants] = useState(null)
    const [invalidEvent, setInvalidEvent] = useState(false)


    const eventId = props.match.params.eventId

    useEffect(() => {
        getEvent(eventId,
            response => {
                setEvent(response.data)
            },
            error => {
                setInvalidEvent(true)
            })
    }, [])

    useEffect(() => {
        if (event) {
            getEventParticipants(event.id, response => {
                setParticipants(response.data)
            })
        }
    }, [event])

    const participantList = () =>
        <div>
            {participants.map(participant => <div key={participant.id}>
                {participant.username}
                <div>
                </div>
            </div>)}
        </div>

    const eventItem = (
        <div>
            {event &&
            <Paper className={classes.paper}>
                {!isEmpty(participants) && participantList()}
            </Paper>
            }
            {invalidEvent && <Paper className={classes.paper}>'4̸̛͚̹̩̘͖̩̟̺̣͈͇̻̒̍̽̍̑͊̈́̿0̴̨̟̘̻̽̀̄͜4̵̧̡̛͓̯̬̬̯̄̇'</Paper>}
        </div>

    )

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <CustomLink to={'/events/'}>. . </CustomLink>
                / {event && event.name} {invalidEvent && '(눈_눈)'}
            </Paper>
            {eventItem}
        </div>
    );
}

export default Event