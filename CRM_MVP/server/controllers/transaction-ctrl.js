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
        //prueba = sumBy(transactions, ({UnitPrice}) => UnitPrice)
        //sum = _.reduce(transactions.UnitPrice, function(memo, num){ return memo + num; }, 0);

        const orders =  _2(transactions)
          .groupBy('InvoiceNo')
          .map((transaction, id) => ({
            OrderId: id, // InvoiceNo
            CustomerId: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.CustomerID; }))[0] ,
            Country: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.Country; }))[0] ,
            //Date: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.InvoiceDate; }))[0],
            Date: convert(Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.InvoiceDate; }))[0]) , 
            TotalItems: _2.sumBy(transaction, 'Quantity' ),
            //Revenue: _2.sumBy(transaction,  x => (x.Quantity * x.UnitPrice) ),
            Revenue: Math.round((_2.sumBy(transaction,  x => (x.Quantity * x.UnitPrice) ) + Number.EPSILON) * 100) / 100
          }))
          .value()

        return res.status(200).json({ success: true, data: orders })
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
        customers = _.countBy(transactions, function(transactions) { return [transactions.CustomerID, transactions.Country, transactions.FirstName, transactions.LastName ]; });
        //customers = _.groupBy(transactions, function(transactions) { return transactions.CustomerID; });
        //customers2 = _.groupBy(customers, function(customers) { return customers.InvoiceNo; });
        // return { 'CustomerID': transactions.CustomerID, 'Country': transactions.Country }
        //return res.status(200).json({ success: true, data: customers })
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
        products = _.countBy(transactions, function(transactions) { 
            return [transactions.StockCode, transactions.Description, transactions.UnitPrice]; 
        });

        return res.status(200).json({ success: true, data: products })
    }).catch(err => console.log(err))
}

/**********************    MY DATASET        **************************/
getMyDataset = async (req, res) => {
    await Transaction.find({}, (err, transactions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!transactions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Transactions not found` })
        }

        const dataset = Object.values( _2.groupBy(transactions, function(transactions) { 
            return [
                transactions.CustomerID,
                transactions.Name,  
                transactions.InvoiceNo, 
                transactions.InvoiceDate, 
                transactions.Country 
                ];
        }))
        .map((transaction, id)=> ({
                InvoiceNo: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.InvoiceNo; }))[0] ,
                //CustomerId: Object.values(_2.groupBy(transaction, function(transaction) { return transaction.CustomerID; }))[0] ,
                CustomerId: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.CustomerID; }))[0] ,
                Name: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.Name; }))[0] ,                
                Country: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.Country; }))[0] ,
                Date: convert(Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.InvoiceDate; }))[0]) , 
                TotalItems: _2.sumBy(transaction, 'Quantity' ),
                TotalRevenue: Math.round((_2.sumBy(transaction,  x => (x.Quantity * x.UnitPrice) ) + Number.EPSILON) * 100) / 100, 
                Products: Object.keys(
                    _2.groupBy(transaction, function(transaction) { 
                    return JSON.stringify({
                        StockCode: transaction.StockCode,
                        Description: transaction.Description,
                        Quantity: transaction.Quantity,
                        UnitPrice: transaction.UnitPrice
                    });
                    })
                )
            }))
        ;

        return res.status(200).json({ success: true, data: dataset })
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
    getMyDataset
}