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

    handleChangeStockCode = async event => {
        const StockCode = event.target.value
        this.setState({ StockCode })
    }

    handleChangeDescription = async event => {
        const Description = event.target.value
        this.setState({ Description })
    }

    handleChangeDescription = async event => {
        const Description = event.target.value
        this.setState({ Description })
    }

    handleChangeQuantity = async event => {
        const Quantity = event.target.validity.valid
            ? event.target.value
            : this.state.Quantity

        this.setState({ Quantity })
    }

    handleChangeInvoiceDate = async event => {
        const InvoiceDate = event.target.value
        this.setState({ InvoiceDate })
    }

    handleChangeUnitPrice = async event => {
        const UnitPrice = event.target.validity.valid
            ? event.target.value
            : this.state.UnitPrice

        this.setState({ UnitPrice })
    }

    handleChangeInvoiceDate = async event => {
        const InvoiceDate = event.target.value
        this.setState({ InvoiceDate })
    }


    handleChangeCustomerID = async event => {
        const CustomerID = event.target.value
        this.setState({ CustomerID })
    }

    handleChangeCountry = async event => {
        const Country = event.target.value
        this.setState({ Country })
    }

    /*
    handleIncludeTransaction = async () => {
        const { 
        	InvoiceNo, 
        	StockCode, 
        	Description, 
        	Quantity, 
        	InvoiceDate, 
        	UnitPrice, 
        	CustomerID, 
        	Country
        } = this.state
        //const arrayTime = time.split('/')
        const payload = { 
        	InvoiceNo, 
        	StockCode, 
        	Description, 
        	Quantity, 
        	InvoiceDate, 
        	UnitPrice, 
        	CustomerID, 
        	Country 
        }

        await api.insertTransaction(payload).then(res => {
            window.alert(`Transaction inserted successfully`)
            this.setState({
	            InvoiceNo: null,
			    StockCode: "",
			    Description: "",
			    Quantity: null ,
			    InvoiceDate: "",
			    UnitPrice: null ,
			    CustomerID: null ,
			    Country: ""
            })
        })
    }
    */
    handleUpdateTransaction = async () => {
        const { 
            InvoiceNo, 
            StockCode, 
            Description, 
            Quantity, 
            InvoiceDate, 
            UnitPrice, 
            CustomerID, 
            Country
        } = this.state

        const payload = { 
            InvoiceNo, 
            StockCode, 
            Description, 
            Quantity, 
            InvoiceDate, 
            UnitPrice, 
            CustomerID, 
            Country 
        }

        await api.updateTransactionById(this.state.id, payload).then(res => {
            window.alert(`Transaction updated successfully`)
            this.setState({
                name: '',
                rating: '',
                time: '',
            })
           // event.preventDefault()
            window.location.href = `/transactions/list`
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const transaction = await api.getTransactionById(id)

        this.setState({
            InvoiceNo:   transaction.data.data.InvoiceNo,
			StockCode:   transaction.data.data.StockCode,
			Description: transaction.data.data.Description,
			Quantity:    transaction.data.data.Quantity ,
			InvoiceDate: transaction.data.data.InvoiceDate,
			UnitPrice:   transaction.data.data.UnitPrice ,
			CustomerID:  transaction.data.data.CustomerID ,
			Country:     transaction.data.data.Country,
        })
    }

    render() {
        const { 
        	InvoiceNo, 
        	StockCode, 
        	Description, 
        	Quantity, 
        	InvoiceDate, 
        	UnitPrice, 
        	CustomerID, 
        	Country
        } = this.state
        return (
            <Wrapper>
                <Title>Create New Transaction</Title>

                <Label>InvoiceNo: </Label>
                <InputText
                    type="number"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={InvoiceNo}
                    onChange={this.handleChangeInvoiceNo}
                />
                <Label>StockCode: </Label>
                <InputText
                    type="number"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={StockCode}
                    onChange={this.handleChangeStockCode}
                />

                <Label>Description: </Label>
                <InputText
                    type="text"
                    lang="en-US"
                    value={Description}
                    onChange={this.handleChangeDescription}
                />

                <Label>Quantity: </Label>
                <InputText
                    type="number"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    step="1"
                    lang="en-US"
                    min="0"
                    max="10"
                    value={Quantity}
                    onChange={this.handleChangeQuantity}
                />

                <Label>InvoiceDate: </Label>
                <InputText
                    type="text"
                    value={InvoiceDate}
                    onChange={this.handleChangeInvoiceDate}
                />

                <Label>UnitPrice: </Label>
                <InputText
                    type="number"
                    value={UnitPrice}
                    onChange={this.handleChangeUnitPrice}
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

                <Label>Country: </Label>
                <InputText
                    type="text"
                    value={Country}
                    onChange={this.handleChangeCountry}
                />

                <Button onClick={this.handleUpdateTransaction}>Update Transaction</Button>
                <CancelButton href={'/transactions/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default TransactionsUpdate
