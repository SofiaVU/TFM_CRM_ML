const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Transaction = new Schema(
    {
        InvoiceNo:   { type: Number, required: true  },
	    StockCode:   { type: String, required: true  },
	    Description: { type: String, required: false },
	    Quantity: 	 { type: Number, required: true  },
	    InvoiceDate: { type: Date,   required: true  },
	    UnitPrice:   { type: Number, required: true  },
	    CustomerID:  { type: Number, required: true  },
	    Country:     { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('transactions', Transaction)