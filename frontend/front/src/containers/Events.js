import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {getEvents } from 'api'
import {deleteEvent } from 'api'



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


export default function ComplexGrid() {
    const classes = useStyles();
    const [events, setEvents] = useState([])


    useEffect(() => {
        getEvents(response => {
            setEvents(response.data)
        })
    }, [])



    const eventItem = event => {

        function handleClick(e) {
            console.log(e.id)
            var index = events.indexOf(e)
            console.log(index)
            //delete events[index]
            deleteEvent(event, response => {
                getEvents(response => {
                    setEvents(response.data)
                })
            })

        }

        return (

            <Paper key={event.id} className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="https://m.media-amazon.com/images/I/71SvlEdYL6L._SS500_.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {event.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {event.created_by}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    lisätietoja
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }} >
                                    <IconButton className={classes.button} aria-label="delete" onClick={(e) => handleClick(event)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">Date</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

        )

    }

    return (
        <div className={classes.root}>
            {events.map(event => eventItem(event))}
        </div>
    );
}