//import { map, tail, times, uniq } from 'lodash';
//import _ from 'lodash';
 
const Transaction = require('../models/transaction-model')
var _ = require('underscore-node')
var _2 = require('lodash')

createTransaction = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Transaction',
        })
    }

    const transaction = new Transaction(body)

    if (!transaction) {
        return res.status(400).json({ success: false, error: err })
    }

    transaction
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: transaction._id,
                message: 'Transaction created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Transaction not created!',
            })
        })
}

updateTransaction = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Transaction.findOne({ _id: req.params.id }, (err, transaction) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Transaction not found!',
            })
        }

        transaction.InvoiceNo = body.InvoiceNo
        transaction.StockCode = body.StockCode
        transaction.Description = body.Description
        transaction.Quantity = body.Quantity
        transaction.InvoiceDate = body.InvoiceDate
        transaction.UnitPrice = body.UnitPrice
        transaction.CustomerID = body.CustomerID
        transaction.Country  = body.Country

        transaction
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: transaction._id,
                    message: 'Transaction updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Transaction not updated!',
                })
            })
    })
}

deleteTransaction = async (req, res) => {
    await Transaction.findOneAndDelete({ _id: req.params.id }, (err, transaction) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!transaction) {
            return res
                .status(404)
                .json({ success: false, error: `Transaction not found` })
        }

        return res.status(200).json({ success: true, data: transaction })
    }).catch(err => console.log(err))
}

getTransactionById = async (req, res) => {
    await Transaction.findOne({ _id: req.params.id }, (err, transaction) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!transaction) {
            return res
                .status(404)
                .json({ success: false, error: `Transaction not found` })
        }
        return res.status(200).json({ success: true, data: transaction })
    }).catch(err => console.log(err))
}

getTransactions = async (req, res) => {
    await Transaction.find({}, (err, transactions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!transactions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Transactions not found` })
        }
        return res.status(200).json({ success: true, data: transactions })
    }).catch(err => console.log(err))
}

getOrders = async (req, res) => {
    await Transaction.find({}, (err, transactions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!transactions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Transactions not found` })
        }
        //prueba = sumBy(transactions, ({UnitPrice}) => UnitPrice)
        sum = _.reduce(transactions.UnitPrice, function(memo, num){ return memo + num; }, 0);

        const ans = _2(transactions)
          .groupBy('CustomerID')
          .map((transaction, id) => ({
            transactionId: id,
            revenue: _2.sumBy(transaction, 'UnitPrice'),
            //numOfPeople: _.sumBy(platform, 'numOfPeople')
          }))
          .value()

        prueba = _.groupBy(transactions, function(transactions) { return [transactions.InvoiceNo, transactions.CustomerID, transactions.Description ,(transactions.UnitPrice*transactions.Quantity)]; });

        /*
        prueba_2 =Object.keys(prueba)
        output = {}
        for (i=0; i<Object.keys(prueba).length; i++){
            x ={
                'InvoiceNo': Object.keys(prueba)[i].split(',')[0],
                'CustomerID': Object.keys(prueba)[i].split(',')[1],
                'Description': Object.keys(prueba)[i].split(',')[2],
                'txRevenue': Object.keys(prueba)[i].split(',')[3]
            }
        }
        */

        const ans_2 = _2(transactions)
          .groupBy('CustomerID')
          .map((transaction, id) => ({
            transactionId: id,
            //revenue: _2.sumBy(transaction, function (x) { return _2.multiply('UnitPrice', 'Quantity')}),
            revenue: _2.sumBy(transaction,  x => (x.Quantity * x.UnitPrice) ),
            //numOfPeople: _.sumBy(platform, 'numOfPeople')
          }))
          .value()

        orders = _.groupBy(transactions, function(transactions) { return [transactions.InvoiceNo, transactions.CustomerID, (transactions.UnitPrice*transactions.Quantity)]; });

        return res.status(200).json({ success: true, data: ans_2 })
    }).catch(err => console.log(err))
}

/**********************    CUSTOMERS        **************************/

getCustomers = async (req, res) => {
    
    await Transaction.find({}, (err, transactions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!transactions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Transactions not found` })
        }
        customers = _.countBy(transactions, function(transactions) { return [transactions.CustomerID, transactions.Country ]; });
        //customers = _.groupBy(transactions, function(transactions) { return transactions.CustomerID; });
        //customers2 = _.groupBy(customers, function(customers) { return customers.InvoiceNo; });
        // return { 'CustomerID': transactions.CustomerID, 'Country': transactions.Country }
        //return res.status(200).json({ success: true, data: customers })
        return res.status(200).json({ success: true, data: customers })
    }).catch(err => console.log(err))

}

module.exports = {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactions,
    getTransactionById,
    getCustomers,
    getOrders
}