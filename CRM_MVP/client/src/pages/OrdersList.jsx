import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'
import edit from './../assets/icons/edit3.png'; 
import { Button, Image} from "react-bootstrap";

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
/*******************************
         CLASS DELETE 
********************************/
class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}
/*******************************
         CLASS UPDATE 
********************************/
class UpdateTransaction extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/transactions/update/${this.props.InvoiceNo}`
    }

    render() {
        return <Button variant="link" onClick={this.updateUser}>
                    <Image alt={'edit'} src={edit} height="40" width="40"></Image>
                </Button>
        //<Update onClick={this.updateUser}>Update</Update>
    }
}

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

        const handleClick = () => {
            this.props.history.push('/customers/list');
        }

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
            {
                Header: 'Edit',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateTransaction InvoiceNo={props.original.InvoiceNo} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!orders.length) {
            showTable = false
        }

        return (
            <Wrapper style={divStyle}>
                <h2>Orders ({orders.length})</h2><br/>
                {showTable && (
                    <ReactTable
                        data={orders}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={15}
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