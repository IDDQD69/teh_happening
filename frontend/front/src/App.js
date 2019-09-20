import React from 'react';
import './App.css';

import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import AppRouter from './router'

function App() {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <AppRouter/>
        </MuiPickersUtilsProvider>
    );
}

export default App;
