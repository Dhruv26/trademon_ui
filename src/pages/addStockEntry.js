import React, { useState, useEffect } from 'react';
import AddStockEntryForm from '../components/addStockEntryForm'


const AddPage = () => {
    const [formOptions, setFormOptions] = useState({
        indicators: [],
        indicatorTypeOptions: [],
        timePeriods: [],
    });

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
            />
        </div>
    );
}

export default AddPage;