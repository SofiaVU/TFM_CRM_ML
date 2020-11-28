import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

var _ = require('lodash')

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
                products: products.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { products, isLoading } = this.state
        console.log('TCL: productList -> render -> products', products)

        const productJSON = products.map(function(transaction) {
          return JSON.parse(transaction.Products.values().next().value);
        })
        //console.log(productJSON)

        const aux = _.groupBy(productJSON,  'StockCode');
        const groupedProducts = _.map(aux,(product, id) => ({
            StockCode: Object.keys(_.groupBy(product, function(product) { return product.StockCode; }))[0],
            Description: Object.keys(_.groupBy(product, function(product) { return product.Description; }))[0],
            UnitPrice: Object.keys(_.groupBy(product, function(product) { return product.UnitPrice; }))[0] 
          }))
        ;
        //console.log(groupedProducts)

        const columns = [

            {
                Header: 'Stock Code',
                accessor: 'StockCode',
                filterable: true,
            },
            {
                Header: 'Description',
                accessor: 'Description',
                filterable: true,
            },
            {
                Header: 'Unit Price',
                accessor: 'UnitPrice',
                filterable: true,
            },           
        ]

        let showTable = true
        if (!products.length) {
            showTable = false
        }

        return (
            <Wrapper>
               <h2>Products ({groupedProducts.length})</h2><br/>
                {showTable && (
                    <ReactTable
                        data={groupedProducts}
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
