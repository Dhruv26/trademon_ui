import React, { useState, useEffect } from 'react';
import AddStockEntryForm from '../components/addStockEntryForm'
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


const postFormData = async (formData) => {
    try {
        const postRequest = await fetch("http://localhost:5000/add", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!postRequest.ok) {
            throw Error(postRequest.statusText);
        }

        const postMessage = await postRequest.json();
        return {
            success: true,
            message: postMessage
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

const getParameterTypeOptions = async () => {
    try {
        const response = await fetch('http://localhost:5000/get_entry_meta_data');
        if (!response.ok) {
            throw Error(response.statusText);
        }

        const data = await response.json();
        console.log(data);
        return data.Data;
    }
    catch (error) {
        console.log('Unexpected error occured while fetching: ' + error);
        const FALLBACK_INDICATOR_OPTIONS = ["Add some types"];
        return FALLBACK_INDICATOR_OPTIONS;
    }
}


const AddPage = () => {
    let history = useHistory();
    const [formOptions, setFormOptions] = useState({
        indicators: [],
        indicatorTypeOptions: [],
        timePeriods: [],
    });
    const [failedToCreateRecord, setFailedToCreateRecord] = useState(false);
    const [failureMessage, setFailureMessage] = useState("");

    useEffect(() => {
        async function setOptions() {
            const metadata = await getParameterTypeOptions();
            setFormOptions({
                indicators: metadata.indicators,
                indicatorTypeOptions: metadata.indicatorTypes,
                timePeriods: metadata.timePeriods,
            });
        }
        setOptions();
    }, []);

    const onSubmit = async (values, actions) => {
        console.log(`POSTING Values: ${JSON.stringify(values, null, 4)}`);
        const requestResult = await postFormData(values);

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