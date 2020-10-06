import React, {Component} from 'react';
import pepe from "../assets/pepe.jpg";
import {Jumbotron, Table} from "react-bootstrap";
import CustomerItem from "./../components/CustomerItem";
import axios from 'axios'; // CALLS to API


class CustomerList extends Component {

  // CONSTRUCTOR -> STATE DECLARATION
  constructor(props){
    super(props);
    this.state = {
      customers: []
    };
  }

  // // COMPONENT DID MOUNT
  //componentDidMount
  componentDidMount = () => {
    //http://localhost:3000/api/customers
    axios.get('http://localhost:3000/api/customers').then((res) => {
      this.setState({customers: res.data});
      console.log("ComponentDidMount API call at customerList");
      console.log(this.state.customers);
    }).catch ((err) => {
      console.log(err);
    });
  }

  render(){
    let customerList = [];
    console.log("TRAZA 2")
    console.log(this.state.customers)
    console.log(this.state.customers.data)
    //if(this.state.customers.data) {console.log(Object.keys(this.state.customers.data).length)}
    if(this.state.customers.data) {
      customerList = Object.keys(this.state.customers.data).map((customer, index) => {
        console.log(customer.split(',')[0])
        return (
          //console.log(customer.split(',')[0]) 
          //console.log(customer)
          <CustomerItem key={index} customer={customer} />
        );
       });
    }

    /*customerList = (this.state.customers).map((customer, index) => {
      return (
        <CustomerItem key={index}
                      customer={customer}
                      firstName={customer.firstName[index]}
                      lastName={customer.lastName[index]}
                      memberId={customer.id[index]}
                      avatar={pepe}
        />
       );
     });*/

    //if(this.state.customers === null || this.state.customers === undefined) {
    if(!this.state.customers.data) {
      return(<h1>Cargando . . . </h1>);
    }
    else{
      return (
        //<h2>Customers ({this.state.customers.length})</h2><br/>
        <Jumbotron style={{backgroundColor:'#fff', width:'90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}>
          <h2>Customers ({Object.keys(this.state.customers.data).length})</h2><br/>
          <Table responsive style={{textAlign: 'center'}}>
            <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Country</th>
              <th>Customer ID</th>
              <th>Edit</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {customerList}
            </tbody>
          </Table>
        </Jumbotron>
      );
    }
  }
};
export default CustomerList;
//<th>Rewards</th>
//<th>Membership</th>
