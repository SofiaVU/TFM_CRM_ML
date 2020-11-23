import React, { PropTypes } from "react";
import Paper from '@material-ui/core/Paper';
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";
import axios from 'axios'; // CALLS to API


// CALL TO API TO RETRIEVE DATA
function getData(){
  axios.get('http://localhost:3000/api/monthlyRevenue').then((res) => {
      this.setState({monthlyRevenue: res.data});
      //console.log("CALL TO API TO RETRIEVE 'MonthlyRevenue' DATA");
      //console.log(this.state.customers);
      //return res.data
    }).catch ((err) => {
      console.log(err);
    });
}


// Rojo-Rosa(ce1c58)
const Graph_2 = props => {
  const styles = {
    paper: {
      backgroundColor: '#BC74FF',
      height: '150'
    },
    div: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "95%",
      height: 85
    },
    header: {
      color: '#ffff',
      backgroundColor: '#975DCE',
      padding: '10px'
    }
  };

  const styles_2 = {
    navigation: {
      fontSize: 15,
      color: '#aaaaaa',
      paddingBottom: 15,
      display: "block"
    },
    title: {
      fontSize: 24,
      marginBottom: 20
    },
    paper: {
      padding: 30
    },
    clear: {
      clear: "both"
    }
  }

  //const data2= getData()

  const data = [
    {name: 'Page A', uv: 400, pv: 400, amt: 2400},
    {name: 'Page B', uv: 300, pv: 2000, amt: 2000},
    {name: 'Page C', uv: 200, pv: 300, amt: 2400},
    {name: 'Page D', uv: 100, pv: 2000, amt: 2000},
    {name: 'Page E', uv: 50, pv: 100, amt: 2400},
    {name: 'Page F', uv: 0, pv: 2000, amt: 2000}
  ]; // data={props.data}

  /*return (
    <Paper style={styles.paper}>
      <div style={{ ...styles_2.title, ...styles.header }}>
        Monthly Sales
      </div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <Bar dataKey="uv" fill={'#975DCE'} />
            <XAxis dataKey="name" stroke="none" tick={{ fill: '#ffff' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  ); */

  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles_2.title, ...styles.header }}>
        Monthly Sales
      </div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={props.data}>
            <Bar dataKey="TotalRevenue" fill={'#975DCE'} />
            <XAxis dataKey="YearMonth" stroke="none" tick={{ fill: '#ffff' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );

};

/* MonthlySales.propTypes = {
  data: PropTypes.array
}; */

export default Graph_2;
