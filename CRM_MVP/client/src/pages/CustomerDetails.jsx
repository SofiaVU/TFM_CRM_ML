import {Jumbotron, Table} from "react-bootstrap";
import React from 'react'
import TransactionItem from './../components/TransactionItem'
import api from '../api'
import {Row, Col,Button, Spinner,form, label, FieldGroup,FormGroup,ControlLabel, FormControl} from 'react-bootstrap';

const divStyle = {
    marginLeft: '5%',
    marginTop: '2%',
    width: '90%',
};


export default class CustomerDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            transactions: [], 
            isLoading: true
          };
    }

    /*async componentWillMount() {
        axios.get('http://localhost:3000/api/transactions').then((res) => {
        this.setState({transactions: res.data});
        console.log("ComponentDidMount API call at transactionList");
        //console.log(this.state.transactions);
        }).catch ((err) => {
        console.log(err);
        });
        
    }*/
    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllOrders().then(orders => {
            this.setState({
                transactions: orders.data.data,
                isLoading: false,
            })
        })
    }
    
    render(){
        if(this.state.isLoading == true) {
            return(
              <div>
                <Button  size="lg" variant="Link" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span>
                </Button>{' '}
                <Button size="lg" variant="Link" disabled>
                  Loading Data ...
                </Button>
              </div>
            ); 
          } 

        let transactionsList = [];
        console.log("TRAZA 2")
        console.log(this.state.transactions)
        transactionsList = (this.state.transactions).map((transaction, index) => {
        return (
            <TransactionItem key={index}
                        transaction={transaction}
                        invoiceNo={transaction.InvoiceNo}
                        customerId={transaction.CustomerID}
                        tx_date={transaction.Date}
            />
        );
        });
        return(
            <div style={divStyle}>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
                <Col md={2} />
                    <Col xs={12} md={8}>
                        <Row className="show-grid">
                            <Col xs={12} md={6}>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h1><strong>Customer Name: Pepe</strong></h1> 
                                        <h3><strong>Customer ID:</strong> 00000 </h3>            
                                        <h3><strong>Country:</strong> Spain </h3>
                                        <h3><strong>Last purchase date:</strong> 2021-01-01 </h3>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={12} md={6}>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h1><strong>PREDICTED CLIENT's LIFETIME VALUE</strong></h1>
                                        <h3>HIGH VALUE CLIENT</h3>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            
                            <Jumbotron style={{backgroundColor:'#fff', width:'90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}>
                            <h2>Clients Transactions</h2>
                                <Table responsive style={{textAlign: 'center'}}>
                                    <thead>
                                    <tr>
                                    <th>InvoiceNo</th>
                                    <th>Customer Name</th>
                                    <th>CustomerID</th>
                                    <th>Date</th>
                                    <th>Edit</th>
                                    <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactionsList}
                                    </tbody>
                                </Table>
                            </Jumbotron>
                        </Row>
                    </Col>
                
            </div>
        );
    }

}
