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
class UpdateTransaction extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/transactions/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}
/*******************************
         CLASS DELETE 
********************************/
class DeleteTransaction extends Component {
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
}
/*******************************
         CLASS LIST 
********************************/

class TransactionsList_2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllTransactions().then(transactions => {
            this.setState({
                transactions: transactions.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { transactions, isLoading } = this.state
        console.log('TCL: TransactionsList -> render -> transactions', transactions)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'InvoiceNo',
                accessor: 'InvoiceNo',
                filterable: true,
            },
            {
                Header: 'StockCode',
                accessor: 'StockCode',
                filterable: true,
            },
            {
                Header: 'Description',
                accessor: 'Description',
                filterable: true,
                style: { 'whiteSpace': 'unset' } 
            },
            {
                Header: 'Quantity',
                accessor: 'Quantity',
                filterable: true,
            },
            {
                Header: 'InvoiceDate',
                accessor: 'InvoiceDate',
                filterable: true,
            },
            {
                Header: 'UnitPrice',
                accessor: 'UnitPrice',
                filterable: true,
            },
            {
                Header: 'CustomerID',
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
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteTransaction id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateTransaction id={props.original._id} />
                        </span>
                    )
                },
            },
            
        ]

        let showTable = true
        if (!transactions.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={transactions}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={20}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default TransactionsList_2