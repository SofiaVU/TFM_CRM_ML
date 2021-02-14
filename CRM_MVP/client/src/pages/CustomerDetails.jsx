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
            id: this.props.match.params.id,
            transactions: [], 
            isLoading: true,
          };
    }
    componentDidMount = async () => {
        const { id } = this.state
        console.log(id)
        
        const transactions = await api.getTransactionByCustomerId(id)
        console.log("Transaction By Customer ID")
        console.log(transactions.data)

        const LTVfeatures = await api.getLTVfeatures(id)
        console.log("LTV Features")
        console.log(LTVfeatures.data.data[0])

        this.setState({
            transactions: transactions.data.data,
            User: transactions.data.data[0],
            LTVfeatures: LTVfeatures.data.data[0],
            isLoading: false,
        })
    }

    handlePredictLTV = async () => {
        const payload = { 
        	Recency: 95, 
            Frequency: 5,
            Revenue: 948.25
        }
        const customerValue =  await api.getLTV(this.state.LTVfeatures).then(res => {
            //window.alert(`LTV Prediction`)
            return res.data
        }) 
        this.setState({
            LTV_value: customerValue,
        }) 
        //console.log("LTV VALUE")  
        //console.log(customerValue)
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
        //console.log("TRAZA 2")
        //console.log(this.state.transactions)
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
                            <Col xs={12} md={7}>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h2><strong>Customer Name:</strong><a style={{color: 'red'}}> {this.state.User.Name}</a></h2> 
                                        <h3><strong>Customer ID:</strong> {this.state.User.CustomerID} </h3>            
                                        <h3><strong>Country:</strong> {this.state.User.Country} </h3>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={12} md={5}>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h1><strong>PREDICTED LTV</strong></h1> 
                                        <Button variant="success" onClick={this.handlePredictLTV}>Predict</Button>
                                        <h3>{this.state.LTV_value}</h3>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            
                            <Jumbotron style={{backgroundColor:'#fff', width:'90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}>
                            <h2>Costumer's Transactions</h2>
                                <Table responsive style={{textAlign: 'center'}}>
                                    <thead>
                                    <tr>
                                    <th style={{textAlign: 'center'}}>InvoiceNo</th>
                                    <th style={{textAlign: 'center'}}>Date</th>
                                    <th style={{textAlign: 'center'}}>TotalItems</th>
                                    <th style={{textAlign: 'center'}}>TotalRevenue</th>
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
