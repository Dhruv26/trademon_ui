import React, { useState, useEffect } from 'react';


function StockDetails({ match }) {
    const [stockDetails, setStockDetails] = useState({
        data: []
    });

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
    }

    return (
        <div>
            <h1>{`Details page: ${match.params.id}`}</h1>
            <p>{JSON.stringify(stockDetails)}</p>
        </div>
    );
}

export default StockDetails;