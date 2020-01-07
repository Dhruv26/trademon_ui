import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StockDetailsTable from '../components/stockDetailsTable';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';


const createColumnsArray = (groupData) => {
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalDeleteClicked, setModalDeleteClicked] = useState(false);

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

    const editButtonClicked = () => {
        console.log('Edit button clicked');
    };

    const handleDelete = async () => {
        setModalDeleteClicked(true);
        console.log('Modal delete clicked.');

        const id = match.params.id;
        try {
            const deleteRequest = await fetch(`http://localhost:5000/delete/${id}`);
            if (!deleteRequest.ok) {
                throw Error(deleteRequest.statusText);
            }
            history.push('/');
        } catch (error) {
            setModalDeleteClicked(false);
        }
    };

    return (
        <div>
            <Modal show={showDeleteModal} aria-labelledby="contained-modal-title-vcenter"centered >
                <Modal.Header>
                    <Modal.Title>DELETE</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Are you sure you want to delete {${stockDetails.stockName}}`}</Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar>
                        <Button variant="danger" disabled={modalDeleteClicked} onClick={handleDelete}>
                            {modalDeleteClicked ? "Deleting..." : "Yes"}
                        </Button>
                        <Button variant="warning" onClick={() => setShowDeleteModal(false)}>Close</Button>
                    </ButtonToolbar>
                </Modal.Footer>
            </Modal>

            <h1>{`Details for ${stockDetails.stockName}`}</h1>
            <div className="mt-2 mb-2">
                <ButtonToolbar>
                    <Button variant="info" onClick={editButtonClicked}>Edit</Button>
                    <Button variant="danger" onClick={() => {
                        setShowDeleteModal(true)
                        console.log(`Delete button clicked.`);
                    }}>
                        Delete
                    </Button>
                </ButtonToolbar>
            </div>
            {
                stockDetails && stockDetails.indicatorGroups ? (
                    <>
                        {stockDetails.indicatorGroups.map((groupData, index) => {
                            const columns = createColumnsArray(groupData);
                            return (
                                <StockDetailsTable key={index} columnData={columns} tableData={groupData.indicators} />
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