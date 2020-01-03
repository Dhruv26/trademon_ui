import React, { Component } from 'react';

class AddPage extends Component {
    constructor() {
        super();
        this.state = {
            indicators: [],
            indicatorTypeOptions: [],
            timePeriods: [],
        };
    }

    async componentDidMount() {
        const metadata = await this.getParameterTypeOptions();

        this.setState({
            indicators: metadata.indicators,
            indicatorTypeOptions: metadata.indicatorTypes,
            timePeriods: metadata.time_periods,
        });
    }

    async getParameterTypeOptions() {
        try {
            const response = await fetch('http://localhost:5000/getStockEntryMetaData');
            if (!response.ok) {
                throw Error(response.statusText);
            }

            const data = await response.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.log('Unexpected error occured while fetching: ' + error);
            const FALLBACK_INDICATOR_OPTIONS = ["Add some types"];
            return FALLBACK_INDICATOR_OPTIONS;
        }
    }

    render() {
        return (
            <div>
                <h1>Add Stock Entry</h1>
                <h3>Please enter the following details.</h3>
            </div>
        );
    }
}

export default AddPage;