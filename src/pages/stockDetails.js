import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StockDetailsTable from '../components/stockDetailsTable';


const createColumnsArray = (groupData, history) => {
    console.log(`Creating columns array from ${JSON.stringify(groupData)}`);
    const columns = [
        {
            Header: 'Indicator Type',
            accessor: 'type'
        },
        {
            Header: 'Time Period',
            accessor: 'period'
        },
        {
            Header: 'Indicator',
            accessor: 'indicator'
        },
        {
            Header: 'Value',
            accessor: 'value'
        },
        {
            Header: 'Comments',
            accessor: 'comment'
        },
        {
            Header: 'Date Ref',
            accessor: 'dateRef'
        }
    ];
    let header = '';
    if (groupData && groupData.groupName) {
        header = groupData.groupName;
    }

    return [
        {
            Header: header,
            columns: columns
        }
    ];
};


const StockDetails = ({ match }) => {
    let history = useHistory();
    const [stockDetails, setStockDetails] = useState({});

    useEffect(() => {
        const entryId = match.params.id;
        console.log(`Entry ID: ${entryId}`);
        async function get() {
            const data = await fetchStockDetails(entryId);
            setStockDetails(data.Data);
        }

        get();
    }, [match.params.id]);

    const fetchStockDetails = async (id) => {
        console.log('Fetching stock data.');
        try {
            const stockDataRequest = await fetch(`http://localhost:5000/get_stock_info/${id}`);
            if (!stockDataRequest.ok) {
                throw Error(stockDataRequest.statusText);
            }

            const stockData = await stockDataRequest.json();
            return stockData;
        } catch (error) {
            console.log(`Error occured while fetching stock data: ${error}`);
            return null;
        }
    };

    return (
        <div>
            <h1>{`Details for ${stockDetails.stockName}`}</h1>
            {
                stockDetails && stockDetails.indicatorGroups ? (
                    <>
                        {stockDetails.indicatorGroups.map(groupData => {
                            const columns = createColumnsArray(groupData, history);
                            return (
                                <StockDetailsTable columnData={columns} tableData={groupData.indicators} />
                            );
                        })}
                    </>
                ) : (
                        <>
                            <h4>Connot find group data.</h4>
                            <p>{JSON.stringify(stockDetails)}</p>
                            <h5>{`Condition: ${stockDetails && stockDetails.indicatorGroups}`}</h5>
                        </>
                    )
            }
        </div>
    );
}

export default StockDetails;