const mongoose = require('mongoose')

mongoose
	//.connect('mongodb://127.0.0.1:27017/DB_Simplified_2nov20', { useNewUrlParser: true }) // DB SIMPLIFIED, no repeated transactionIDs
    //.connect('mongodb://127.0.0.1:27017/DB_Simplified_21oct20', { useNewUrlParser: true })
    //.connect('mongodb://127.0.0.1:27017/CRM_DB', { useNewUrlParser: true }) // DB with a few transactions but with repeated transactionsIDs
    .connect('mongodb://127.0.0.1:27017/CRM_Full_DB', { useNewUrlParser: true }) // DB with all duplicated transactions for each product
    //.connect('mongodb://127.0.0.1:27017/CRM_prueba', { useNewUrlParser: true }) // NO
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db