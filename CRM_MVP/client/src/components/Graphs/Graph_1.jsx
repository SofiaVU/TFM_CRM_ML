import React, { PropTypes } from "react";
import Paper from '@material-ui/core/Paper';//"material-ui/Paper";
import { white, purple600, purple500 } from '@material-ui/core/styles/colorManipulator';
import { LineChart, Line, ResponsiveContainer, CatesianGrid,XAxis,YAxis } from "recharts";
import { typography } from '@material-ui/core/styles';

const Graph_1 = props => {

// morados: paper (bc66cc) header (9c27b0)
  const styles = {
    paper: {
      backgroundColor: '#92D050',
      height: '160px'
    },
    div: {
      height: 95,
      padding: "5px 15px 0 15px"
    },
    header: {
      fontSize: 24,
      color: 'white',
      backgroundColor: '#12BB03',
      padding: 10
    }
  };


  const data = [
    {name: 'Page A', uv: 400, pv: 400, amt: 2400},
    {name: 'Page B', uv: 300, pv: 2000, amt: 2000},
    {name: 'Page C', uv: 200, pv: 300, amt: 2400},
    {name: 'Page D', uv: 100, pv: 2000, amt: 2000},
    {name: 'Page E', uv: 50, pv: 100, amt: 2400},
    {name: 'Page F', uv: 0, pv: 2000, amt: 2000}
  ]; // data={props.data}

  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.header }}>New Orders</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default Graph_1;
