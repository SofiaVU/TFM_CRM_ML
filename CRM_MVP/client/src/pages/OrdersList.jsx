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

/*******************************
         CLASS UPDATE 
********************************/
/*class UpdateTransaction extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/transactions/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}*/
/*******************************
         CLASS DELETE 
********************************/
/*class DeleteTransaction extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the transaction ${this.props.id} permanently?`,
            )
        ) {
            api.deleteTransactionById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}*/
/*******************************
         CLASS LIST 
********************************/

class OrdersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllOrders().then(orders => {
            this.setState({
                orders: orders.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { orders, isLoading } = this.state
        console.log('TCL: OrderList -> render -> orders', orders)

        const columns = [

            {
                Header: 'Order ID',
                accessor: 'InvoiceNo',
                filterable: true,
            },
            {
                Header: 'Customer ID',
                accessor: 'CustomerId',
                filterable: true,
            },
            {
                Header: 'Country',
                accessor: 'Country',
                filterable: true,
                style: { 'whiteSpace': 'unset' } 
            },
            {
                Header: 'Date',
                accessor: 'Date',
                filterable: true,
            },
            {
                Header: 'Total Items',
                accessor: 'TotalItems',
                filterable: true,
            },
            {
                Header: 'Revenue [$]',
                accessor: 'TotalRevenue',
                filterable: true,
            },            
        ]

        let showTable = true
        if (!orders.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={orders}
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

export default OrdersList