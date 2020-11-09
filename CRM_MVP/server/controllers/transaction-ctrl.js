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

function clean_data(transactions){
    /*** Clean dataset ***/
    const aux = _2.reject(transactions, function(o) { return o.Country.match('[0-9]'); })
    const aux2 = _2.reject(aux, function(o) { return o.Country==''; })
    const aux3 = _2.reject(aux2, function(o) { return o.CustomerID==''; })
    const aux4 = _2.reject(aux3, function(o) { return o.InvoiceNo== undefined; })
    const clean_transactions = _2.reject(aux4, function(o) { return o.Name==''; })

    return clean_transactions
}

/*********************************************/

/**************************************************************************************************************************************************************************/
/***********************************************                     NEED TO CHECK FUNTIONS                      **********************************************************/
/**************************************************************************************************************************************************************************/

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
/**************************************************************************************************************************************************************************/
/***********************************************                         END CHECK FUNTIONS                      **********************************************************/
/**************************************************************************************************************************************************************************/

/**********************    ORDERS/ TRANSCTIONS    **************************/

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

       const tx = clean_data(transactions)

        return res.status(200).json({ success: true, data: tx })
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

       const clean_transactions = clean_data(transactions)

       const customers = _2(clean_transactions) // (transactions) --ª eliminamos los countries numericos
          .groupBy('CustomerID')
          .map((transaction, id) => ({
            CustomerID: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.CustomerID; }))[0]  ,
            Name: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.Name; }))[0] ,
            Country: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.Country; }))[0]
            
          }))
          .value()

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

       const products = clean_data(transactions)

        return res.status(200).json({ success: true, data: products })
    }).catch(err => console.log(err))
}

/**********************    MY DATASET  (DELETE)       **************************/
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
                CustomerID: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.CustomerID; }))[0] ,
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

/**********************    SUMUP INFO FOR INFOBOXES (Dashboard Page)    **************************/

getInfoBoxes = async (req, res) => {
    await Transaction.find({}, (err, transactions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!transactions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Transactions not found` })
        }
        
       const clean_transactions = clean_data(transactions)

        const customers = _2(clean_transactions) // (transactions) --ª eliminamos los countries numericos
        .groupBy('CustomerID')
        .map((transaction, id) => ({
            CustomerID: Object.keys(_2.groupBy(transaction, function(transaction) { return transaction.CustomerID; }))[0]            
        })).value()
        
        const data = {
            TotalCustomers: customers.length
        }

        return res.status(200).json({ success: true, data: data })
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