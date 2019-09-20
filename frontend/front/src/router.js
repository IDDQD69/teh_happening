import React from 'react'


import { BrowserRouter as Router, Route } from 'react-router-dom'


import Main from 'containers/Main'
import Events from 'containers/Events'
import TopBar from "./components/TopBar";


function AppRouter(props) {

    return(

        <Router>
            <TopBar/>
            <div>
                <Route path="/" exact component={Main} />
                <Route path="/events" exact component={Events} />
            </div>
        </Router>
    )

}

export default AppRouter