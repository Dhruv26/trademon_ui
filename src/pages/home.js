import React, { Component } from 'react';
import IndexTable from '../components/indexPageTable';
import { Button } from 'react-bootstrap';


const ID_KEY = '_id';


class HomePage extends Component {
    state = {
        columns: [],
        data: []
    };

    async handleMoreInfo(rowData) {
        console.log(rowData);
        const currID = rowData[ID_KEY];
        let history = this.props.history;
        history.push(`/details/${currID}`);
    };

    async componentDidMount() {
        const columns = [{
            Header: 'My Table',
            columns: [
                {
                    Header: 'Stock Name',
                    accessor: 'StockName'
                },
                {
                    Header: 'EMA',
                    accessor: 'EMA'
                },
                {
                    Header: 'SMA',
                    accessor: 'SMA'
                },
                {
                    Header: 'RSI',
                    accessor: 'RSI'
                },
                {
                    Header: 'More Info',
                    Cell: cellInfo => (
                        <div>
                            <Button size="sm" onClick={() => {
                                const index = cellInfo.row.index;
                                this.handleMoreInfo(cellInfo.data[index]);
                            }}>
                                More Info
                            </Button>
                        </div>
                    )
                }
            ]
        }];

        const tableData = await this.getTableData();
        const data = tableData.Data;

        this.setState({
            columns: columns,
            data: data
        });
    }

    async getTableData() {
        try {
            const tableDataResponse = await fetch('http://localhost:5000/get_table');
            if (!tableDataResponse.ok) {
                throw Error(tableDataResponse.statusText);
            }

            const tableData = await tableDataResponse.json();
            return tableData;
        } catch (error) {
            return {
                Data: [],
            };
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <IndexTable
                    columnData={this.state.columns}
                    tableData={this.state.data}
                />
            </div>
        );
    }
}

export default HomePage;