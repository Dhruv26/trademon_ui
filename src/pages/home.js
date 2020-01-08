import React, { useState, useEffect } from 'react';
import IndexTable from '../components/indexPageTable';
import { Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import APIService from '../services/APIService';


const ID_KEY = '_id';


const HomePage = (props) => {
    const [tableData, setTableData] = useState({
        columns: [],
        data: []
    });
    const [showCreationSuccess, setCreationSuccess] = useState(false);
    let history = useHistory();

    const handleMoreInfo = async (rowData) => {
        const currID = rowData[ID_KEY];
        history.push(`/details/${currID}`);
    };

    useEffect(() => {
        async function setTableDataState() {
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
                                    handleMoreInfo(cellInfo.data[index]);
                                }}>
                                    More Info
                                </Button>
                            </div>
                        )
                    }
                ]
            }];
    
            const tableData = await apiService.getHomeTableData();
            const data = tableData.Data;
    
            setTableData({
                columns: columns,
                data: data
            });
        }
        setTableDataState();

        if (props.location.state && props.location.state.entryCreated) {
            setCreationSuccess(props.location.state.entryCreated);
        }
    }, [props]);

    const apiService = new APIService();

    return (
        <div>
            <Alert show={showCreationSuccess} onClose={() => setCreationSuccess(false)} variant="success" className="mt-2 mb-2" dismissible>
                <p>Entry created successfully!</p>
            </Alert>
            <IndexTable
                columnData={tableData.columns}
                tableData={tableData.data}
            />
        </div>
    );
}

export default HomePage;