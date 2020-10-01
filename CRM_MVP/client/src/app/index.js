//import React from 'react'
import React, { Component } from 'react';

import { NavBar, SideBar } from '../components'
import { TransactionsList, TransactionsInsert, TransactionsUpdate } from '../pages'


// STYLE: BOOTSTRAP & CSS
import { GoGraph,GoListUnordered,GoTag,GoPerson,GoOrganization } from "react-icons/go";
import { IconContext } from "react-icons";
import 'bootstrap/dist/css/bootstrap.min.css'

// SIDE BAR
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


/********************************************************************************************************/


// MER APP NAVBAR
function App() {
    return (
        <Router>
            <SideBar />            
        </Router>
    )
}


export default App;

