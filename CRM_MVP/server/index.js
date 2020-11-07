const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const transactionRouter = require('./routes/transaction-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/sofia', (req, res) => {
    res.send('Hello Sofia! How are you?!')
})

app.use('/api', transactionRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

//app.keepAliveTimeout = 100 * 1000;
//app.headersTimeout = 120 * 1000; // This should be bigger than `keepAliveTimeout + your server's expected response time`