import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

import {Image} from "react-bootstrap";
import edit from './../assets/icons/edit3.png'; 
import pepe from './../assets/pepe.jpg'; 

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

class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllProducts().then(products => {
            this.setState({
                products: customers.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { products, isLoading } = this.state
        console.log('TCL: ProductList -> render -> products', products)

        const columns = [

            {
                Header: 'Name',
                accessor: 'Name',
                filterable: true,
            },
            {
                Header: 'First Name',
                id: 'id',
                accessor: row => row.['Name'].split(" ")[0],
                filterable: true,
            },
            {
                Header: 'Last Name',
                id: 'id',
                accessor: row => row.['Name'].split(" ")[1],
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
           
        ]

        let showTable = true
        if (!products.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={products}
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

export default ProductList