import React from 'react';
import { useTable, useResizeColumns } from 'react-table';
import { Table } from 'react-bootstrap';


const IndexTable = ({ columnData, tableData }) => {
    const columns = React.useMemo(() => columnData, [columnData]);
    const data = React.useMemo(() => tableData, [tableData]);
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 30,
            width: 150,
            maxWidth: 400,
        }),
        []
    )
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data,
        defaultColumn
    }, useResizeColumns);

    return (
        <Table bordered striped hover {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
};


export default IndexTable;