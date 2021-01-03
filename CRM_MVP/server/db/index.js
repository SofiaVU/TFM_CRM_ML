const mongoose = require('mongoose')

mongoose
    //.connect('mongodb://127.0.0.1:27017/CRM_7nov', { useNewUrlParser: true }) 
    .connect('mongodb://10.154.0.2:27017/BBDD_OnlineRetail', { useNewUrlParser: true }) // --> resultado de aplicar funcion js mydataset
    //.connect('mongodb://127.0.0.1:27017/Initial_DataSet_withNames', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
// /Users/sofiavu/Desktop/TFM/1_CRM_MVP/TFM_repo/TFM_CRM_ML/Data/FINAL/BBDD_OnlineRetail.json
