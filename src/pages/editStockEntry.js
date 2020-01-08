import React, { useEffect, useState } from 'react';
import AddStockEntryForm from '../components/addStockEntryForm';
import { useHistory } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

const postFormData = async (formData) => {
    try {
        const postRequest = await fetch("http://localhost:5000/update", {
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


const EditStockEntryPage = (props) => {
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
        console.log(`POSTING Values: ${JSON.stringify(values, null, 2)}`);
        const id = values['_id'];
        const requestResult = await postFormData(values);

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

    console.log(props);
    const currentValues = props.location.state.stockDetails;

    return (
        <>
            <h2>Edit Stock Entry</h2>
            <AddStockEntryForm
                initialValues={currentValues}
                indicatorOptions={formOptions.indicators}
                indicatorTypeOptions={formOptions.indicatorTypeOptions}
                timePeriods={formOptions.timePeriods}
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