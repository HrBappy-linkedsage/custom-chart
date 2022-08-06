import './App.css';
import React, { useEffect, useState, PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ZAxis
} from 'recharts';

const data = [
  {
    put: 10,
    call: 60,
    underlyingPrice: 2
  },
  {
    put: 50,
    call: 30,
    underlyingPrice: 4
  },
  {
    put: 20,
    call: 30,
    underlyingPrice: 5
  },
  {
    put: 60,
    call: 30,
    underlyingPrice: 15
  },
  {
    put: 20,
    call: 66,
    underlyingPrice: 41
  },
  {
    put: 50,
    call: 20,
    underlyingPrice: 32
  },
  {
    put: 50,
    call: 20,
    underlyingPrice: 32
  },
  {
    put: 50,
    call: 20,
    underlyingPrice: 32
  },
  {
    put: 50,
    call: 20,
    underlyingPrice: 32
  },
  {
    put: 50,
    call: 20,
    underlyingPrice: 32
  },
  {
    put: 50,
    call: 20,
    underlyingPrice: 32
  },
];

function leftCustomTickFormatter(value) {
  return value + 'k';
}

function App() {
  const [leftMaxYAxis, setLeftMaxYAxis] = useState(0);
  useEffect(() => {
    let max = 0;
    for (const i in data) {
      const sum = data[i].put + data[i].call;
      if (sum > max) {
        max = sum;
      }
    }
    setLeftMaxYAxis(max)
  }, [])
  return (
    <div>
      <ComposedChart
        width={500}
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
        <XAxis type="category" />
        <YAxis yAxisId="left-axis" domain={[0, Math.ceil(leftMaxYAxis / 25) * 25]} tickFormatter={leftCustomTickFormatter} tickCount={Math.ceil(leftMaxYAxis / 25) + 1} />
        <YAxis yAxisId="right-axis" orientation='right' />
        <Tooltip />
        <Legend />
        <Bar dataKey="put" yAxisId="left-axis" barSize={20} stackId="a" fill="#413ea0" />
        <Bar dataKey="call" barSize={20} yAxisId="left-axis" stackId="a" fill="#82ca9d" />
        <Line type="monotone" yAxisId="right-axis" dataKey="underlyingPrice" stroke="#ff7300" />

      </ComposedChart>
    </div>
  );
}

export default App;
