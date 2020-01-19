import React, { useEffect, useState } from 'react';
import AddStockEntryForm from '../components/addStockEntryForm';
import { useHistory } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import APIService from '../services/APIService';


const EditStockEntryPage = (props) => {
    let history = useHistory();
    const [formOptions, setFormOptions] = useState({
        indicators: [],
        indicatorTypeOptions: [],
        timePeriods: [],
        tradeTypes: []
    });
    const [failedToCreateRecord, setFailedToCreateRecord] = useState(false);
    const [failureMessage, setFailureMessage] = useState("");

    useEffect(() => {
        async function setOptions() {
            const metadata = await apiService.getParameterTypeOptions();
            setFormOptions({
                indicators: metadata.indicators,
                indicatorTypeOptions: metadata.indicatorTypes,
                timePeriods: metadata.timePeriods,
                tradeTypes: metadata.tradeTypes,
            });
        }
        setOptions();
    }, []);

    const apiService = new APIService()

    const onSubmit = async (values, actions) => {
        const id = values['_id'];
        const requestResult = await apiService.updateStockEntry(values);

        if (requestResult.success) {
            history.push(`/details/${id}`, {
                entryUpdated: true
            });
            return;
        }
        // Handle failure
        actions.setSubmitting(false);
        setFailedToCreateRecord(true);
        setFailureMessage(requestResult.message);
    }

    const currentValues = props.location.state.stockDetails;

    return (
        <>
            <h2>Edit Stock Entry</h2>
            <AddStockEntryForm
                initialValues={currentValues}
                indicatorOptions={formOptions.indicators}
                indicatorTypeOptions={formOptions.indicatorTypeOptions}
                timePeriods={formOptions.timePeriods}
                tradeTypes={formOptions.tradeTypes}
                onSubmit={onSubmit}
            />
            <Button variant="warning" block className="mb-4"
                onClick={() => {
                    const id = currentValues['_id'];
                    history.push(`/details/${id}`);
                }}
            >
                Cancel
            </Button>
            <Alert show={failedToCreateRecord} variant="danger" onClose={() => setFailedToCreateRecord(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{failureMessage}</p>
            </Alert>
        </>
    );
};

export default EditStockEntryPage;