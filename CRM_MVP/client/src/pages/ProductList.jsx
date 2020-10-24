import React, {Component} from 'react';
import {Jumbotron, Table} from "react-bootstrap";
import ProductItem from "./../components/ProductItem";
import axios from 'axios'; // CALLS to API


class ProductList extends Component {

  // CONSTRUCTOR -> STATE DECLARATION
  constructor(props){
    super(props);
    this.state = {
      customers: []
    };
  }

  // COMPONENT DID MOUNT
  componentDidMount = () => {
    axios.get('http://localhost:3000/api/products').then((res) => {
      this.setState({products: res.data});
      console.log("ComponentDidMount API call at productList");
      console.log(this.state.products);
    }).catch ((err) => {
      console.log(err);
    });
  }

  render(){
    let productList = [];
    console.log("TRAZA 2")
    console.log(this.state.products)

    if(this.state.products != undefined) {
      productList = Object.keys(this.state.products.data).map((product, index) => {
        //console.log(product.split(',')[0])
        return (
          <ProductItem key={index} product={product} />
        );
       });
    }

    if(this.state.products == undefined) {
      return(<h1>Cargando . . . </h1>);
    }
    else{
      return (
        <Jumbotron style={{backgroundColor:'#fff', width:'90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}>
          <h2>Products ({Object.keys(this.state.products.data).length})</h2><br/>
          <Table responsive style={{textAlign: 'center'}}>
            <thead>
            <tr>
              <th>Stock Code</th>
              <th>Description</th>
              <th>UnitPrice</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {productList}
            </tbody>
          </Table>
        </Jumbotron>
      );
    }
  }
};
export default ProductList;

