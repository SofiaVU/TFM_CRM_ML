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
                id: 'id',
                accessor: 'Name',
                filterable: true,
            },
            /*{
                Header: 'Last Name',
                id: 'id',
                accessor: row => row.['Name'].split(" ")[1],
                filterable: true,
            },*/
            /*{
                Header: 'Name',
                accessor: row => return (<Image className="ui small rounded image" alt="pepe" src={pepe} height="42" width="42" rounded />) ,
                filterable: true,
            },*/
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
           
        ]

        let showTable = true
        if (!customers.length) {
            showTable = false
        }

        return (
            <Wrapper>
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