const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Transaction = new Schema(
    {
		// Base de Datos: DB_OnlineRetail
		InvoiceNo:    { type: String, required: true  },
		CustomerID:   { type: String, required: true  },
		Name:    	  { type: String, required: false },
		Country:      { type: String, required: false },
		Date: 		  { type: Date,   required: true  },
		TotalItems:   { type: Number, required: true  },
		TotalRevenue: { type: Number, required: true  },
		Products: 	  { type: Object, required: true  }, 
		
		// Base de Datos: CRM_7nov
		/*InvoiceNo:    { type: Number, required: true  },
		CustomerID:   { type: Number, required: true  },
		Name:    	  { type: String, required: false },
		Country:      { type: String, required: false },
		Date: 		  { type: Date,   required: true  },
		TotalItems:   { type: Number, required: true  },
		TotalRevenue: { type: Number, required: true  },
		Products: 	  { type: Object, required: true  },*/

		// Base de datos: Initial_DataSet_withNames
		/* InvoiceNo:    { type: String, required: true  },
		CustomerID:   { type: String, required: true  },
		Name:    	  { type: String, required: false },
		Country:      { type: String, required: false },
		InvoiceDate:  { type: Date,   required: true  },
		StockCode:    { type: String, required: true  },
		Description:  { type: String, required: false },
		Quantity: 	  { type: Number, required: true  },	    
		UnitPrice:    { type: Number, required: true  }, */
		
    },
    { timestamps: true },
)

module.exports = mongoose.model('transactions', Transaction)