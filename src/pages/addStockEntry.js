import React, { useState, useEffect } from 'react';
import AddStockEntryForm from '../components/addStockEntryForm'
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import APIService from '../services/APIService';


const AddPage = () => {
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

    const apiService = new APIService();

    const onSubmit = async (values, actions) => {
        const requestResult = await apiService.createStockEntry(values);

        if (requestResult.success) {
            history.push("/", {
                entryCreated: true
            });
            return;
        }
        // Handle failure
        actions.setSubmitting(false);
        setFailedToCreateRecord(true);
        setFailureMessage(requestResult.message);
    }

    return (
        <div className="container">
            <div className="row mb-2">
                <div className="col-lg-12 text-center">
                    <h1 className="mt-2">Add Stock Entry</h1>
                </div>
            </div>
            <h3>Please enter the following details</h3>
            <AddStockEntryForm
                indicatorOptions={formOptions.indicators}
                indicatorTypeOptions={formOptions.indicatorTypeOptions}
                timePeriods={formOptions.timePeriods}
                tradeTypes={formOptions.tradeTypes}
                onSubmit={onSubmit}
            />
            <Alert show={failedToCreateRecord} variant="danger" onClose={() => setFailedToCreateRecord(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{failureMessage}</p>
            </Alert>
        </div>
    );
}

export default AddPage;