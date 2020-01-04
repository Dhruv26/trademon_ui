import React, { useState, useEffect } from 'react';


function StockDetails({ match }) {
    const [stockDetails, setStockDetails] = useState({});

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

    useEffect(() => {
        console.log(match)
        fetchStockDetails();
    }, []);

    return (
        <div>
            <h1>{`Details page: ${match.params.id}`}</h1>
        </div>
    );
}

export default StockDetails;