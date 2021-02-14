import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

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
    width: '90%',
  };

class TransactionsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            InvoiceNo: null,
		    StockCode: "",
		    Description: "",
		    Quantity: null ,
		    InvoiceDate: "",
		    UnitPrice: null ,
		    CustomerID: null ,
		    Country: ""
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

    handleChangeQuantity = async event => {
        const Quantity = event.target.validity.valid
            ? event.target.value
            : this.state.Quantity

        this.setState({ Quantity })
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
    handleUpdateTransaction = async () => {
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

        await api.updateTransactionByInvoiceNo(this.state.id, payload).then(res => {
            window.alert(`Transaction updated successfully`)
            this.setState({
                name: '',
                rating: '',
                time: '',
            })
            //event.preventDefault()
            window.location.href = `/transactions/list`
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        console.log(id)
        const transaction = await api.getTransactionByInvoiceNo(id)

        this.setState({
            InvoiceNo:     transaction.data.data.InvoiceNo,
			CustomerID:    transaction.data.data.CustomerID,
			Name:          transaction.data.data.Name,
            Country:       transaction.data.data.Country ,
            Date:          transaction.data.data.Date ,
			TotalItems:    transaction.data.data.TotalItems,
            TotalRevenue:  transaction.data.data.TotalRevenue ,
            Products:      transaction.data.data.Products ,
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

                <Button onClick={this.handleUpdateTransaction}>Update Transaction</Button>
                <CancelButton href={'/orders/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default TransactionsUpdate