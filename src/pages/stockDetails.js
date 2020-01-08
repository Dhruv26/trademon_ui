import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StockDetailsTable from '../components/stockDetailsTable';
import { Alert, Button, ButtonToolbar, Modal } from 'react-bootstrap';
import APIService from '../services/APIService';


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


const StockDetails = ({ location, match }) => {
    let history = useHistory();
    const [stockDetails, setStockDetails] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalDeleteClicked, setModalDeleteClicked] = useState(false);
    const [showUpdateMessage, setShowUpdateMessage] = useState(false);

    useEffect(() => {
        const entryId = match.params.id;
        async function get() {
            const data = await apiService.getStockDetails(entryId);
            setStockDetails(data);
        }

        get();
        if (location.state && location.state.entryUpdated) {
            setShowUpdateMessage(location.state.entryUpdated);
        }
    }, [match, location]);

    const apiService = new APIService();

    const editButtonClicked = () => {
        console.log('Edit button clicked');
        history.push('/edit', {
            stockDetails: stockDetails
        });
    };

    const handleDelete = async () => {
        setModalDeleteClicked(true);

        const id = match.params.id;
        try {
            const deleteRequest = await apiService.deleteStockEntry(id);
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
            <Alert show={showUpdateMessage} onClose={() => setShowUpdateMessage(false)} variant="success" className="mt-2 mb-2" dismissible>
                <p>Entry updated successfully!</p>
            </Alert>
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
                            <h4>Error occured! Cannot find group data.</h4>
                        </>
                    )
            }
        </div>
    );
}

export default StockDetails;