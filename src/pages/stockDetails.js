import React, { useState, useEffect } from 'react';


function StockDetails({ match }) {
    const [stockDetails, setStockDetails] = useState({});

    useEffect(() => {
        console.log(match)
        fetchStockDetails();
    }, []);

    const fetchStockDetails = async () => {
        try {
            const stockDataRequest = await fetch(``);
            console.log(JSON.stringify(stockDataRequest));
            if (!stockDataRequest.ok) {
                throw Error(stockDataRequest.statusText);
            }
                
            const stockData = await stockDataRequest.json();
            setStockDetails(stockData);
            return stockData;
        } catch (error) {
            console.log(`Error occured while fetching stock data: ${error}`);
            
            setStockDetails(null);
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