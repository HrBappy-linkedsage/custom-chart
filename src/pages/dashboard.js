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
    ResponsiveContainer
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
const Dashboard = () => {
    const [data, setData] = useState([]);
    const [leftMaxYAxis, setLeftMaxYAxis] = useState(0);
    const [underlying_priceYAxis, setUnderlying_priceYAxis] = useState({
        max: 0,
        min: 0,
    });

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

    useEffect(() => {
        let max = 0;
        for (const i in data) {
            if (data[i].underlying_price > max) {
                max = data[i].underlying_price;
            }
        }
        let min = max;

        for (const i in data) {
            if (data[i].underlying_price < min) {
                min = data[i].underlying_price;
            }
        }
        setUnderlying_priceYAxis({
            max: max + 100, min: min - 100
        })
    }, [data])
    return (
        <div className='dashboard'>
            <div className='top-heading'>
                <div className='overflow'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>
                        Overflow For:
                        <span>&nbsp;8/10/2022</span> |
                        <span>&nbsp;8/9/2022</span> |
                        <span>&nbsp;8/8/2022</span> |
                        <span>&nbsp;8/5/2022</span> |
                        <span>&nbsp;8/4/2022</span>
                    </span>
                </div>
                <div className='filter'>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className='top-heading-search'>
                            <input defaultValue="TSLA" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h2 style={{ margin: "0px 0px 0px 20px" }}>Tesla, Inc.</h2>
                    </div>
                    <div className='postmarket-data'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="postmarket-hours-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            POSTMARKET HOURS
                        </span>
                        <p style={{ margin: 0, fontSize: 16 }}>$851.6 &nbsp; <span style={{ color: "rgb(42 137 3)", display: "inline", fontSize: 14 }}>0.19%</span></p>
                    </div>
                </div>
            </div>
            <div className='intraday-options-volume-tsla'>
                <h3 className='title'>INTRADAY OPTIONS VOLUME (Tue, Aug 9, 2022) - TSLA</h3>
                <p className='volume'>
                    <span>P/C Ratio: 1.032</span> |
                    <span>&nbsp;Call Vol: 589.39K</span> |
                    <span>&nbsp;Put Vol: 608.01K</span> |
                    <span>&nbsp;Total Vol: 1.2M</span> |
                    <span>&nbsp;Call Prem: 929.36M</span> |
                    <span>&nbsp;Put Prem: 1.75B</span> |
                    <span>&nbsp;Total Prem: 2.68B</span>
                </p>
                {/* <div>
          <button className=''>Call/Put Vol.</button>
        </div> */}
                <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart
                        width="100%"
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis interval={2} dataKey="tape_time" tickFormatter={xAxisTickFormatter} tick={{ fill: 'white' }} />

                        <YAxis yAxisId="left-axis" domain={[0, leftMaxYAxis && ((parseInt((leftMaxYAxis / 25).toString()[0]) + 1) * 25) * parseInt(1 + "0".repeat(leftMaxYAxis.toString().length - 2))]} tickFormatter={leftCustomTickFormatter} tickCount={6} tick={{ fill: 'white' }} />

                        {/* <YAxis yAxisId="right-axis" orientation='right' domain={['auto', 'auto']} tickCount={6} tickFormatter={rightCustomTickFormatter} type="number" interval={0} tick={{ fill: 'white' }} /> */}
                        <Tooltip />

                        <Legend />
                        <Bar dataKey="put_volume" yAxisId="left-axis" barSize={12} stackId="a" fill="#6460db" />
                        <Bar dataKey="call_volume" barSize={12} yAxisId="left-axis" stackId="a" fill="#82ca9d" />
                        {/* <Line type="monotone" yAxisId="right-axis" dataKey="underlying_price" stroke="#ff7300" /> */}

                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div >
    );
};

export default Dashboard;