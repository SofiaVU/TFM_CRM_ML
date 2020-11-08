import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

//var _2 = require('lodash')
//import _2 from 'lodash'

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
        console.log(productJSON)

        /*************************** LODASH Logica de Negocio **********************************************************/
        
        /*var aux = _2.reject(productJSON, function(o) { return o.StockCode.match('[a-z]'); })
        var aux2 = _2.reject(aux, function(o) { return o.StockCode.match('[A-Z]'); })
        var aux3 = _2.reject(aux2, function(o) { return o.StockCode==''; }) */
        

        /*const groupedProducts= _2.(aux3)
        .groupBy('StockCode')
          .map((product, id) => ({
            StockCode: Object.keys(_2.groupBy(product, function(product) { return product.StockCode; }))[0]  ,
            Description: Object.keys(_2.groupBy(product, function(product) { return product.Description; }))[0] ,
            UnitPrice: Object.keys(_2.groupBy(product, function(product) { return product.UnitPrice; }))[0]
            
          }))
          .value()
          console.log(groupedProducts) */
        /****************************************************************************************************************/
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
               <h2>products ({productArray.length})</h2><br/>
                {showTable && (
                    <ReactTable
                        data={productArray}
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
