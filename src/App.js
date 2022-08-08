import './App.css';
import React, { useEffect, useState } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

function leftCustomTickFormatter(value) {
  return value / 1000 + 'k';
}

function rightCustomTickFormatter(value) {
  console.log(value)
  return '$' + value;
}

function xAxisTickFormatter(value) {
  // const time = new Date(value).getHours() + ":" + new Date(value).getMinutes()
  return value;
}

function App() {
  const [data, setData] = useState([]);
  const [leftMaxYAxis, setLeftMaxYAxis] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("generated.json", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => setData(data))
    }
    fetchData();
  }, [])

  useEffect(() => {
    let max = 0;
    for (const i in data) {
      const sum = data[i].put_volume + data[i].call_volume;
      if (sum > max) {
        max = sum;
      }
    }
    setLeftMaxYAxis(max)
  }, [data])

  return (
    <div>
      <ComposedChart
        width={1200}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis interval={2} dataKey="tape_time" tickFormatter={xAxisTickFormatter} />

        <YAxis yAxisId="left-axis" domain={[0, leftMaxYAxis && ((parseInt((leftMaxYAxis / 25).toString()[0]) + 1) * 25) * parseInt(1 + "0".repeat(leftMaxYAxis.toString().length - 2))]} tickFormatter={leftCustomTickFormatter} tickCount={6} />

        <YAxis yAxisId="right-axis" orientation='right' domain={['auto', 'auto']} tickCount={6} tickFormatter={rightCustomTickFormatter} type="number" interval={0} />
        <Tooltip />

        <Legend />
        <Bar dataKey="put_volume" yAxisId="left-axis" barSize={20} stackId="a" fill="#413ea0" />
        <Bar dataKey="call_volume" barSize={20} yAxisId="left-axis" stackId="a" fill="#82ca9d" />
        <Line type="monotone" yAxisId="right-axis" dataKey="underlying_price" stroke="#ff7300" />

      </ComposedChart>
    </div>
  );
}

export default App;
