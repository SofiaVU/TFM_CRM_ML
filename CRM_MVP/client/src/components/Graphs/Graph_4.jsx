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
    {name: "Page A", uv: 590, pv: 800, amt: 1400},
    {name: "Page B", uv: 868, pv: 967, amt: 1506},
    {name: "Page C", uv: 1397, pv: 1098, amt: 989},
    {name: "Page D", uv: 1480, pv: 1200, amt: 1228},
    {name: "Page E", uv: 1520, pv: 1108, amt: 1100},
    {name: "Page F", uv: 1400, pv: 680, amt: 1700}
  ];

  //<Paper style={styles.paper}>
  return (
    <div>
      <span style={styles_2.title}>Website Analysis</span>
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
              <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="pv" barSize={20} fill="#413ea0" />
              <Line dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Graph_4;
