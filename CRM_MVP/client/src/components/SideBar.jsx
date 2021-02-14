import React, { Component } from 'react'

// STYLE: BOOTSTRAP & CSS
import { IconContext } from "react-icons";
import { GoGraph,GoListUnordered,GoOrganization, GoDiffAdded, GoInfo} from "react-icons/go";
import { GiPresent } from "react-icons/gi";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

// SIDE BAR
import { Link } from 'react-router-dom'
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';// not used: Toggle, Nav,
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const sidenabCSS ={
	position: '-webkit-sticky', position: 'sticky', top: '0', };

class SideBar extends Component {

	constructor(props){
        super(props);
        this.state = {
          //customer: [],
          navExpanded: false,
		  style: {paddingTop:'50px', marginLeft:'-100px', marginRight:'-100px',  zIndex: '99999'}
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
	                      style: {paddingLeft:'0px', paddingRight:'0px', paddingTop:'50px',  zIndex: '99999'}
	                    });
	                  }
	                  if (this.state.navExpanded === true){
	                    this.setState({
	                      navExpanded: false,
	                      style: {paddingLeft:'0px', paddingRight:'0px', paddingTop:'50px',  zIndex: '99999'}
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
	                    	Customers
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
            </Container>
        )
    }

}

export default SideBar

/*

<NavItem eventKey="transactions/customerDetails">
	                  <NavIcon>
	                    <IconContext.Provider value={{size:"2em"}}>
	                     	<Link to="/transactions/customerDetails">
	                      		<GoInfo />
	                      	</Link>
	                    </IconContext.Provider>
	                  </NavIcon>
	                  <NavText>
	                    <Link to="/transactions/customerDetails">
	                    	Customer Details
	                    </Link>
	                  </NavText>
	                </NavItem>

*/
