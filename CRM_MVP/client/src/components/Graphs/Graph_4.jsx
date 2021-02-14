import React, { PropTypes } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import Paper from '@material-ui/core/Paper';

const Graph_4 = props => {
  const styles = {
    paper: {
      minHeight: '350px',
      padding: '20px',
      backgroundColor: '#fff',
    },
    legend: {
      paddingTop: '20px'
    },
    pieChartDiv: {
      height: '290px',
      textAlign: "center",
      marginTop: '10px',
    }
  };

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

  const data = [
    {name: "DOGGY RUBBER", Value: 590, Sold: 800, Stock: 1400},
    {name: "FAN BLACK FRAME", Value: 868, Sold: 967, Stock: 1506},
    {name: "ANIMAL STICKERS", Value: 1397, Sold: 1098, Stock: 989},
    {name: "SANDALWOOD FAN", Value: 1480, Sold: 1200, Stock: 1228},
    {name: "DAISY JOURNAL", Value: 1520, Sold: 1108, Stock: 1100},
    {name: "FROG CANDLE", Value: 1400, Sold: 680, Stock: 1700}
  ];

  //<Paper style={styles.paper}>
  return (
    <div>
      <span style={styles_2.title}>Product Analysis</span>
      <div style={styles_2.clear} />
      <div className="row">
        <div className="col-xs-12">
          <div style={styles.pieChartDiv}>
            <ComposedChart
              layout="vertical"
              width={600}
              height={320}
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis type="number" padding={{left: 5}} />
              <YAxis dataKey="name" type="category" padding={{bottom: 10}} />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Area dataKey="Stock" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="Sold" barSize={20} fill="#413ea0" />
              <Line dataKey="Value" stroke="#ff7300" />
            </ComposedChart>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Graph_4;
