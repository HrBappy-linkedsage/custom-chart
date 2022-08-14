import React from 'react';
import { useTable } from 'react-table';

const ReactTable = ({ data: { columns, data } }) => {
    const reactTable = useTable({
        columns, data,
        initialState: {
            hiddenColumns: ["id"],
            pageSize: 100,
        },
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = reactTable;


    return (
        <table className='Table'>
            <thead>
                {
                    headerGroups.map(group =>
                        <tr {...group.getHeaderGroupProps()}>
                            {
                                group.headers.map(columns =>
                                    <th {...group.getHeaderProps}>
                                        {columns.render('Header')}
                                    </th>
                                )
                            }
                        </tr>
                    )
                }
            </thead>
            <tbody>
                {
                    rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell =>
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                }
                            </tr>
                        )
                    })
                }
            </tbody>

        </table>
    );
};

export default ReactTable;