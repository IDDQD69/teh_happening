import React, {useEffect, useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CalendarIcon from '@material-ui/icons/Event'
import UserIcon from '@material-ui/icons/Person'

import {getEvents, deleteEvent} from 'api'
import CustomLink from "../components/CustomLink";
import Link from "@material-ui/core/Link";


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


function Events() {
    const classes = useStyles();
    const [events, setEvents] = useState([])
    const [sortType, setSortType] = useState("")



    useEffect(() => {
        getEvents(response => {
            setEvents(response.data)
        })
    }, [])


    const eventItem = event => {

        function handleClick(e) {
            const index = events.indexOf(e)
            //delete events[index]
            deleteEvent(event, response => {
                getEvents(response => {
                    setEvents(response.data)
                })
            })

        }

        return (
            <Paper key={event.id} className={classes.paper}>
                {console.log(event)}
                <Grid container spacing={2}>
                    <Grid item>
                        <CustomLink to={'/events/' + event.id}>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src="https://picsum.photos/200"/>
                            </ButtonBase>
                        </CustomLink>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <CustomLink to={'/events/' + event.id}>
                                    <Typography gutterBottom variant="subtitle1">
                                        {event.name}
                                    </Typography>
                                </CustomLink>
                                <Typography variant="body2" gutterBottom>
                                    {event.created_by}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    lisätietoja
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{cursor: 'pointer'}}>
                                    <IconButton className={classes.button} aria-label="delete"
                                                onClick={(e) => handleClick(event)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{event.date}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Paper>

        )

    }

    function sortByDate() {
        const sortedEvents = events.sort(function(a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateA - dateB;
        })
        setEvents(sortedEvents)
        setSortType("date")
    }

    function sortByUser() {
        const sortedEvents = events.sort(function(a, b){
            if(a.created_by < b.created_by) { return -1; }
            if(a.created_by > b.created_by) { return 1; }
            return 0;
        })
        sortedEvents.pop(sortedEvents.indexOf(0))
        setEvents(sortedEvents)
        setSortType("user")
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Button className={classes.root}>
                    <CustomLink to={'/event/new/'}>new event</CustomLink>
                </Button>
                <IconButton className={classes.button} aria-label="calendar"
                            onClick={(e) => sortByDate()}>
                    <CalendarIcon/>
                </IconButton>
                <IconButton className={classes.button} aria-label="user"
                            onClick={(e) => sortByUser()}>
                    <UserIcon/>
                </IconButton>
            </Paper>
            {events.map(event => eventItem(event))}
        </div>
    );
}

export default Events