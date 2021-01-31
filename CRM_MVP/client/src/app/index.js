import React from 'react';

// React Components
import {SideBar } from '../components'
import { TransactionsInsert, TransactionsUpdate, Dashboard, CustomerList, OrdersList, ProductList } from '../pages'

// STYLE: BOOTSTRAP & CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// React-Router - web paging 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CustomerDetails from '../pages/CustomerDetails';


const divStyle = {
    marginLeft: '100rem',
    backgroundColor: 'blue'
  };


function App() {
    return (
        <Router>
            <SideBar /> 
            <Switch style={divStyle}>
                <Route path="/" exact component={Dashboard} />
                <Route path="/customers/list" exact component={CustomerList} />
                <Route path="/orders/list" exact component={OrdersList} />
                <Route path="/product/list" exact component={ProductList} />
                <Route path="/transactions/create" exact component={TransactionsInsert} />
                <Route path="/transactions/update/:id" exact component={TransactionsUpdate} />
                <Route path="/transactions/customerDetails" exact component={CustomerDetails} />
            </Switch>           
        </Router>
    )
}
export default App;

