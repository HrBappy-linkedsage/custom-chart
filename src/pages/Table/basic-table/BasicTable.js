import React from 'react';

const BasicTable = ({ data: { headers, rows } }) => {
    return (
        <table className='Table'>
            <thead>
                <tr>
                    {
                        headers.map(h => <th>{h}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows.map(r =>
                        <tr>
                            <td>{new Date(r.trade_time).toISOString().slice(0, 19).replaceAll("T", " ")}</td>
                            <td>{r.trade_symbol.substring(2, r.trade_symbol.length - 15)}</td>
                            <td>{r.contract_type}</td>
                            <td>{r.side}</td>
                            <td>{r.strike_price}</td>
                            <td>{r.expiration_date}</td>
                            <td>{r.trade_size}</td>
                            <td>{(r.trade_premiums * 100).toFixed(2) / 1000 + "K" || ""}</td>
                            <td>{r.trade_price}</td>
                            <td>{r.trade_volume}</td>
                            <td>{r.open_interest}</td>
                            <td>{(r.implied_volatility * 100).toFixed(2) || ""}</td>
                            <td>+</td>
                        </tr>
                    )
                }
            </tbody>

        </table>
    );
};

export default BasicTable;