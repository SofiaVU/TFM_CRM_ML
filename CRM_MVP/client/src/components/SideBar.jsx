import React, { Component } from 'react'

// STYLE: BOOTSTRAP & CSS
import { GoGraph,GoListUnordered,GoTag,GoPerson,GoOrganization, GoDiffAdded } from "react-icons/go";
import { GrTransaction } from "react-icons/gr";
import { IconContext } from "react-icons";
import 'bootstrap/dist/css/bootstrap.min.css'

// SIDE BAR
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';// not used: Toggle, Nav,
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { TransactionsList, TransactionsInsert, TransactionsUpdate, Dashboard, CustomerList, TransactionsList_2 } from '../pages'


class SideBar extends Component {

	constructor(props){
        super(props);
        this.state = {
          //customer: [],
          navExpanded: false,
          style: {paddingTop:'50px', marginLeft:'-100px', marginRight:'-100px'}
          //style: {paddingLeft:'0px', paddingRight:'0px', paddingTop:'50px'}

        };
    }

    render() {
        return (
            <Container>
                <SideNav style={{
                	backgroundColor: '#00A4DF', 
                	minHeight: '100%', 
                	height: '100%'}}         
	            >
	              <SideNav.Toggle
	                onClick={() => {
	                  if (this.state.navExpanded === false){
	                    this.setState({
	                      navExpanded: true,
	                      style: {paddingLeft:'0px', paddingRight:'0px', paddingTop:'50px'}
	                    });
	                  }
	                  if (this.state.navExpanded === true){
	                    this.setState({
	                      navExpanded: false,
	                      style: {paddingLeft:'0px', paddingRight:'0px', paddingTop:'50px'}
	                    });
	                  }
	                  console.log(this.state.style)
	                }}
	              />


	              <SideNav.Nav defaultSelected="/">

	              	<NavItem eventKey="dashboard">
	                  <NavIcon>
	                    <IconContext.Provider value={{size:"2em"}}>
	                     	<Link to="/dashboard">
	                      		<GoGraph />
	                      	</Link>
	                    </IconContext.Provider>
	                  </NavIcon>
	                  <NavText>
	                    <Link to="/dashboard">
	                    	Dashboard
	                    </Link>
	                  </NavText>
	                </NavItem>

	                <NavItem eventKey="customers/list">
	                  <NavIcon>
	                    <IconContext.Provider value={{size:"2em"}}>
	                     	<Link to="/customers/list">
	                      		<GoOrganization />
	                      	</Link>
	                    </IconContext.Provider>
	                  </NavIcon>
	                  <NavText>
	                    <Link to="/customers/list">
	                    	Custoemrs
	                    </Link>
	                  </NavText>
	                </NavItem>

	                <NavItem eventKey="transactions/list">
	                  <NavIcon>
	                    <IconContext.Provider value={{size:"2em"}}>
	                     	<Link to="/transactions/list">
	                      		<GoListUnordered />
	                      	</Link>
	                    </IconContext.Provider>
	                  </NavIcon>
	                  <NavText>
	                    <Link to="/transactions/list">
	                    	Orders
	                    </Link>
	                  </NavText>
	                </NavItem>

	                <NavItem eventKey="transactions/list2">
	                  <NavIcon>
	                    <IconContext.Provider value={{size:"2em"}}>
	                     	<Link to="/transactions/list2">
	                      		<GoListUnordered />
	                      	</Link>
	                    </IconContext.Provider>
	                  </NavIcon>
	                  <NavText>
	                    <Link to="/transactions/list">
	                    	Orders
	                    </Link>
	                  </NavText>
	                </NavItem>

	                <NavItem eventKey="transactions/create">
	                  <NavIcon>
	                    <IconContext.Provider value={{size:"2em"}}>
	                     	<Link to="/transactions/create">
	                      		<GoDiffAdded />
	                      	</Link>
	                    </IconContext.Provider>
	                  </NavIcon>
	                  <NavText>
	                    <Link to="/transactions/create">
	                    	Create
	                    </Link>
	                  </NavText>
	                </NavItem>

	              </SideNav.Nav>
	            </SideNav>
	            <main style={this.state.style} >
		            <Switch>
		                <Route path="/dashboard" exact component={Dashboard} />
		                <Route path="/customers/list" exact component={CustomerList} />
		                <Route path="/transactions/list" exact component={TransactionsList} />		                
		                <Route path="/transactions/list2" exact component={TransactionsList_2} />
		                <Route path="/transactions/create" exact component={TransactionsInsert} />
		                <Route
		                    path="/transactions/update/:id"
		                    exact
		                    component={TransactionsUpdate}
		                />
		            </Switch>
	            </main>
            </Container>
        )
    }

}

export default SideBar
