const express = require('express')

const TransactionCtrl = require('../controllers/transaction-ctrl')

const router = express.Router()

router.post('/transaction', TransactionCtrl.createTransaction)
router.put('/transaction/:id', TransactionCtrl.updateTransaction)
router.delete('/transaction/:id', TransactionCtrl.deleteTransaction)
router.get('/transaction/:id', TransactionCtrl.getTransactionById)
router.get('/transactions', TransactionCtrl.getTransactions)
router.get('/customers', TransactionCtrl.getCustomers)
router.get('/orders', TransactionCtrl.getOrders)


module.exports = router