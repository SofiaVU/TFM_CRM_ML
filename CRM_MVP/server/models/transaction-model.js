const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Transaction = new Schema(
    {
		InvoiceNo:    { type: Number, required: true  },
		CustomerID:   { type: Number, required: true  },
		Name:    	  { type: String, required: false },
		Country:      { type: String, required: false },
		Date: 		  { type: Date,   required: true  },
		TotalItems:   { type: Number, required: true  },
		TotalRevenue: { type: Number, required: true  },
		Products: 	  { type: Object, required: true  },



	    //StockCode:   { type: String, required: true  },
	    //Description: { type: String, required: false },
	    //Quantity: 	 { type: Number, required: true  },	    
	    //UnitPrice:   { type: Number, required: true  },	    
	    //FirstName:   { type: String, required: false },
	    //LastName:    { type: String, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('transactions', Transaction)