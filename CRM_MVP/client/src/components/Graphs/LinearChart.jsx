import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const styles_2 = {
  navigation: {
    fontSize: '15px',
    color: '#aaaaaa',
    paddingBottom: '15px',
    display: "block"
  },
  title: {
    fontSize: 24,
    marginBottom: '20px'
  },
  paper: {
    padding: '30px'
  },
  clear: {
    clear: "both"
  }
};

const LinearChart = props => {

    return (
      <div><span style={styles_2.title}>Sales Seasonality</span>
      <LineChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="NiceYearMonth" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="TotalRevenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="TotalSoldItems" stroke="#82ca9d" />
      </LineChart></div>
    );
}

export default LinearChart;

