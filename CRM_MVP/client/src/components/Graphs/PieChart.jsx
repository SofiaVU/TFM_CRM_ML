import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts';

const data = [
  { name: 'United Kindom', value: 400 },
  { name: 'Ireland', value: 100 },
  { name: 'France', value: 70 },
  { name: 'Spain', value: 50 },
];

const style = {
    top: 100,
    left: 380,
    lineHeight: '24px',
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class MyPieChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  render() {
    return (
      <div><span style={styles_2.title}>Sales by Country</span>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend iconSize={20} width={250} height={250} layout="vertical" verticalAlign="right" wrapperStyle={style} />
      </PieChart></div>
    );
  }
}
