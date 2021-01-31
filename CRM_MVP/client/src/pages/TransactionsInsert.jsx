import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'


/**  STYLES  **/
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

const divStyle = {
    marginLeft: '5%',
    marginTop: '2%',
    width: '50%'
}

/*******************************
         CLASS INSERT 
********************************/

class TransactionsInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            InvoiceNo: null,
		    CustomerID: "",
		    Name: "",
		    Country: "" ,
		    Date: "",
		    TotalItems: null ,
		    TotalRevenue: null ,
		    Products: []
        }
    }

    handleChangeInvoiceNo = async event => {
        const InvoiceNo = event.target.value
        this.setState({ InvoiceNo })
    }

    handleChangeCustomerID = async event => {
        const CustomerID = event.target.value
        this.setState({ CustomerID })
    }

    handleChangeName = async event => {
        const Name = event.target.value
        this.setState({ Name })
    }

    handleChangeCountry = async event => {
        const Country = event.target.value
        this.setState({ Country })
    }

    handleChangeDate = async event => {
        const Date = event.target.value
        this.setState({ Date })
    }

    handleChangeTotalItems = async event => {
        const TotalItems = event.target.validity.valid
            ? event.target.value
            : this.state.TotalItems

        this.setState({ TotalItems })
    }

    handleChangeTotalRevenue = async event => {
        const TotalRevenue = event.target.validity.valid
            ? event.target.value
            : this.state.TotalRevenue

        this.setState({ TotalRevenue })
    }

    handleChangeProducts = async event => {
        const Products = event.target.value
        this.setState({ Products })
    }

    handleIncludeTransaction = async () => {
        const { 
        	InvoiceNo, 
        	CustomerID, 
        	Name, 
        	Country, 
        	Date, 
        	TotalItems, 
        	TotalRevenue, 
        	Products
        } = this.state
        //const arrayTime = time.split('/')
        const payload = { 
        	InvoiceNo, 
        	CustomerID, 
            Name, 
            Country,
        	Date, 
        	TotalItems, 
        	TotalRevenue, 
        	Products
        }

        await api.insertTransaction(payload).then(res => {
            window.alert(`Transaction inserted successfully`)
            this.setState({
	            InvoiceNo: null,
			    CustomerID: "",
			    Name: "",
			    Country: null ,
			    Date: "",
			    TotalItems: null ,
			    TotalRevenue: null ,
			    Products: []
            })
        })
    }
    render() {
        const {
        	InvoiceNo, 
        	CustomerID, 
        	Name, 
        	Country, 
        	Date, 
        	TotalItems, 
        	TotalRevenue, 
        	Products  
        } = this.state

        return (
            <Wrapper style={divStyle}>
                <Title>Create New Transaction</Title>

                <Label>InvoiceNo: </Label>
                <InputText
                    type="number"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={InvoiceNo}
                    onChange={this.handleChangeInvoiceNo}
                />
                <Label>CustomerID: </Label>
                <InputText
                    type="text"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    value={CustomerID}
                    onChange={this.handleChangeCustomerID}
                />

                <Label>Name: </Label>
                <InputText
                    type="text"
                    lang="en-US"
                    value={Name}
                    onChange={this.handleChangeName}
                />

                <Label>Country: </Label>
                <InputText
                    type="text"
                    value={Country}
                    onChange={this.handleChangeCountry}
                />

                <Label>Date: </Label>
                <InputText
                    type="text"
                    value={Date}
                    onChange={this.handleChangeDate}
                />

                <Label>Total Items: </Label>
                <InputText
                    type="number"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    step="1"
                    lang="en-US"
                    min="0"
                    max="10"
                    value={TotalItems}
                    onChange={this.handleChangeTotalItems}
                />

                <Label>Total Revenue: </Label>
                <InputText
                    type="number"
                    value={TotalRevenue}
                    onChange={this.handleChangeTotalRevenue}
                />

                <Label>Products: </Label>
                <InputText
                    type="array"
                    value={Products}
                    onChange={this.handleChangeProducts}
                />         

                <Button onClick={this.handleIncludeTransaction}>Add Transaction</Button>
                <CancelButton href={'/orders/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default TransactionsInsert