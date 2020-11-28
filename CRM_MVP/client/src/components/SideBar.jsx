import React, { Component } from 'react'

// STYLE: BOOTSTRAP & CSS
import { IconContext } from "react-icons";
import { GoGraph,GoListUnordered,GoTag,GoPerson,GoOrganization, GoDiffAdded, GoDatabase } from "react-icons/go";
import { GiPresent } from "react-icons/gi";
//import { GrTransaction } from "react-icons/gr";

import 'bootstrap/dist/css/bootstrap.min.css'

// SIDE BAR
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';// not used: Toggle, Nav,
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { TransactionsList, TransactionsInsert, TransactionsUpdate, Dashboard, CustomerList, OrdersList, ProductList } from '../pages'


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
	                     	<Link to="/">
	                      		<GoGraph />
	                      	</Link>
	                    </IconContext.Provider>
	                  </NavIcon>
	                  <NavText>
	                    <Link to="/">
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

	                <NavItem eventKey="/orders/list">
	                  <NavIcon>
	                    <IconContext.Provider value={{size:"2em"}}>
	                     	<Link to="/orders/list">
	                      		<GoListUnordered />
	                      	</Link>
	                    </IconContext.Provider>
	                  </NavIcon>
	                  <NavText>
	                    <Link to="/orders/list">
	                    	Orders
	                    </Link>
	                  </NavText>
	                </NavItem>

	                <NavItem eventKey="product/list">
	                  <NavIcon>
	                    <IconContext.Provider value={{size:"2em"}}>
	                     	<Link to="/product/list">
	                      		<GiPresent />
	                      	</Link>
	                    </IconContext.Provider>
	                  </NavIcon>
	                  <NavText>
	                    <Link to="/product/list">
	                    	Products
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
		                <Route path="/" exact component={Dashboard} />
		                <Route path="/customers/list" exact component={CustomerList} />		                
		                <Route path="/orders/list" exact component={OrdersList} />
		                <Route path="/product/list" exact component={ProductList} />
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
