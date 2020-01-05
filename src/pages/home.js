import React, { Component } from 'react';
import IndexTable from '../components/indexPageTable';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


const ID_KEY = '_id';


class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            columns: [],
            data: []
        };
    }

    async handleDelete(rowData) {
        const entryID = rowData[ID_KEY];
        const deleteRequest = await fetch(`http://localhost:5000/delete/${entryID}`,
            {
                method: 'DELETE'
            });
        if (deleteRequest.ok) {
            alert(`Successfully deleted ${rowData}`);
            console.log(this.props.history);
            //this.props.history.push('/');
            return <Redirect to='/' />;
        }

        alert(`Unable to delete ${rowData}. Please try again!`);
        return;
    };

    async handleMoreInfo(rowData) {
        console.log(rowData);
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
                            <Button onClick={() => {
                                const index = cellInfo.row.index;
                                this.handleMoreInfo(cellInfo.data[index]);
                            }}>
                                More Info
                            </Button>
                        </div>
                    )
                },
                {
                    Header: 'Delete',
                    Cell: cellInfo => (
                        <div>
                            <Button variant="danger" onClick={() => {
                                const index = cellInfo.row.index;
                                this.handleDelete(cellInfo.data[index]);
                            }}>
                                Delete
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
                <h1>Home</h1>
                <IndexTable
                    columnData={this.state.columns}
                    tableData={this.state.data}
                />
            </div>
        );
    }
}

export default HomePage;