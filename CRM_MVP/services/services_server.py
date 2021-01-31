from flask import Flask, request, jsonify
import numpy as np # To create the array of requested data
import pandas as pd
import pickle # To load our trained model to predict
#import joblib (OPTION 2 to load model BUT this library is going to be deprecated)

app = Flask(__name__)

# Load the model
model_xgb     = pickle.load(open('ltv_xgb_model.pkl','rb'))
model_linReg  = pickle.load(open('ltv_linReg_model.pkl','rb'))

#model_xgb = joblib.load('ltv_xgb_model.pkl') 
#model_linReg = joblib.load('ltv_linReg_model.pkl') 

####################################################################
######   HELLOW WORLD CALL  (To Check API & Server are UP)   #######
####################################################################
@app.route('/helloWorld')
def hello_world():
    return 'Hello, World!'

####################################################################
######     PREDIUCT CLIENT's LIFETIME VALUE  (XGBoost)   ##########
####################################################################
@app.route('/api_services/ltv',methods=['POST'])
def predict_xgb():
	# Get the data from the POST request.
	data = request.get_json(force=True)
	
	# Trnasform input to dataframe
	columns_xgb = ['Recency', 'Frequency','Revenue']
	index = ['0']
	df_xgb = pd.DataFrame(data, columns=columns_xgb, index=index)
	prediction_xgb = model_xgb.predict(df_xgb)

    # Take the first value of prediction
	output_xgb = prediction_xgb[0]

	return  str(output_xgb) 

####################################################################
###  PREDIUCT REVENUE REVENUE NEXT 6 MONTHS (Linear Regression)   ##
####################################################################
@app.route('/api_services/linReg',methods=['POST'])
def predict_linReg():
	# Get the data from the POST request.
	data = request.get_json(force=True)
	
	# Trnasform input to dataframe
	columns_linReg = ['Recency', 'Frequency','Revenue', 'Num_distinctProducts','Avg_distinctProducts','Quantity','Avg_RevenueTransactions']
	index = ['0']
	df_linReg = pd.DataFrame(data, columns=columns_linReg, index=index)
	prediction_linReg = model_linReg.predict(df_linReg)

    # Take the first value of prediction
	output_linReg = prediction_linReg[0]

	return  str(output_linReg)

if __name__ == '__main__':
	try:
		app.run(port=5000, debug=True)
	except:
		print("Server is exited unexpectedly. Please contact server admin.")