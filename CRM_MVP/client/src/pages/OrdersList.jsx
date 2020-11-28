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
                accessor: 'CustomerID',
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
                //accessor: 'Date',
                id: 'id',
                accessor: row => row.['Date'].split("T")[0],
                filterable: true,
            },
            {
                Header: 'Total Items',
                accessor: 'TotalItems',
                filterable: true,
            },
            {
                Header: 'Revenue',
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
                <h2>Orders ({orders.length})</h2><br/>
                {showTable && (
                    <ReactTable
                        data={orders}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={20}
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