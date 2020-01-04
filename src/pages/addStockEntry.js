import React, { Component } from 'react';
import IndicatorList from '../components/addStockEntryForm'


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
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Add Stock Entry</h1>
                    </div>
                </div>
                <h3>Please enter the following details</h3>
                <IndicatorList
                    indicatorOptions={this.state.indicators}
                    indicatorTypeOptions={this.state.indicatorTypeOptions}
                    timePeriods={this.state.timePeriods}
                />
            </div>
        );
    }
}

export default AddPage;