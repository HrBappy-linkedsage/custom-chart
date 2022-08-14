import React from 'react';
import useData from '../../hooks/useData';
import BasicTable from './basic-table/BasicTable';
import ReactTable from './react-table/ReactTable';

const Table = () => {
    const data = useData();
    return (
        // <BasicTable data={data} />
        <ReactTable data={data} />
    );
};

export default Table;