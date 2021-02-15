import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

/**  STYLES  **/
const Wrapper = styled.div`
    padding: 0 0px 0px 0px;
`
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`
const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const divStyle = {
    marginLeft: '5%',
    marginTop: '2%',
    width: '90%',
};
const linkCss = {
    textDecoration: 'underline',
    textdecorationColor: 'blue',
}
/*************************************
         CLASS CustomerId Details 
*************************************/
class CustomerIdDetails extends Component {
    customerDetailsTx = event => {
        event.preventDefault()
        window.location.href = `/transactions/customerID/${this.props.CustomerID}`
    }

    render() {
        return <a onClick={this.customerDetailsTx} style={linkCss}>{this.props.CustomerID}</a>
        //<Update onClick={this.updateTx}>Update</Update>
    }
}

/*******************************
         CLASS LIST 
********************************/

class CustomerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllCustomers().then(customers => {
            this.setState({
                customers: customers.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { customers, isLoading } = this.state
        console.log('TCL: CustomerList -> render -> customers', customers)

        const columns = [

            {
                Header: 'Name',
                accessor: 'Name',
                filterable: true,
            },
            {
                Header: 'First Name',
                id: '0',
                accessor: row => row.Name.split(" ")[0],
                filterable: true,
            },
            {
                Header: 'Last Name',
                id: '1',
                accessor: row => row.Name.split(" ")[1],
                filterable: true,
            },
            {
                Header: 'Customer ID',
                accessor: 'CustomerID',
                filterable: true,
                Cell: function(props) {
                    return (
                        <span>
                            <CustomerIdDetails CustomerID={props.original.CustomerID} />
                        </span>
                    )
                },
            },
            {
                Header: 'Country',
                accessor: 'Country',
                filterable: true,
                style: { 'whiteSpace': 'unset' } 
            },
           
        ]

        let showTable = true
        if (!customers.length) {
            showTable = false
        }

        return (
            <Wrapper style={divStyle}>
               <h2>Customers ({customers.length})</h2><br/>
                {showTable && (
                    <ReactTable
                        data={customers}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                        style={{textAlign: "center" }}
                    />
                )}
            </Wrapper>
        )
    }
}

export default CustomerList