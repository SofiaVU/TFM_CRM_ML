//import { map, tail, times, uniq } from 'lodash';
//import _ from 'lodash';
 
const Transaction = require('../models/transaction-model')
var _ = require('underscore-node')
var _2 = require('lodash')


/********** AUX FUNCTIONS *******************/

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

/*********************************************/

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

/**********************    TRANASCTIONS        **************************/

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

/**********************    ORDERS        **************************/

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

        return res.status(200).json({ success: true, data: transactions })
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
        //customers = _.countBy(transactions, function(transactions) { return [transactions.CustomerId, transactions.Country, transactions.Name ]; });

        //const customers = _2.reject(transactions, function(o) { return o.Name ==""; })
        const customers = _2.reject(transactions, function(o) { return o.Country.match('[0-9]'); })
       
        // ERROR pues CustomerId sale "Undefined" todo el RATO ????
        const solution = _2(customers) // (transactions) --ª eliminamos los countries numericos
          .groupBy('CustomerId')
          .map((transaction, id) => ({
            CustomerId: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.CustomerId; }))[0]  ,
            Name: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.Name; }))[0] ,
            Country: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.Country; }))[0]
            
          }))
          .value()

        kk = _.countBy(customers, function(transactions) { return [transactions.CustomerId , transactions.Country, transactions.Name ]; });

        return res.status(200).json({ success: true, data: customers })
    }).catch(err => console.log(err))

}

/**********************    PRODUCTS        **************************/
getProducts = async (req, res) => {
    await Transaction.find({}, (err, transactions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!transactions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Transactions not found` })
        }
        /*products = _.countBy(transactions, function(transactions) { 
            return [transactions.StockCode, transactions.Description, transactions.UnitPrice]; 
        });*/

        products = _2(transactions).map((transaction, id) => ({
            StockCode: transaction.Products
            //Description: Object.keys(_2.groupBy(product, function(product) { return product.Description; }))[0] ,
            //UnitPrice: Object.keys(_2.groupBy(product, function(product) { return product.UnitPrice; }))[0]

          }))
          .value()

        return res.status(200).json({ success: true, data: products })
    }).catch(err => console.log(err))
}





module.exports = {
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactions,
    getTransactionById,
    getCustomers,
    getOrders,
    getProducts,
    //getMyDataset
}