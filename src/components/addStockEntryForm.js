import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import "bootstrap/dist/css/bootstrap.css";

const INITIAL_VALUES = {
    stockName: "",
    indicators: [
        {
            type: "RSI",
            period: "DAILY",
        }
    ],
};


const VALIDATION_SCHEMA = Yup.object().shape({
    stockName: Yup.string().required("Stock name is required."),
    indicators: Yup.array()
        .min(1, "Must have at least 1 Indicator.")
        .required("Must have indicators"),
});

const IndicatorList = (props) => (
    <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={values =>
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
            }, 500)}
    >
        {({ values, touched, errors, onSubmit }) => (
            <Form>
                <div className="form-group">
                    <label htmlFor="stockName">Stock Name</label>
                    <Field name="stockName" className={`form-control ${touched.stockName && errors.stockName ? "is-invalid" : ""}`} />
                    <ErrorMessage component="div" name="stockName" className="invalid-feedback" />
                    
                    <FieldArray
                        name="indicators"
                        render={arrayHelper => (
                            <>
                                {values.indicators ? (
                                    values.indicators.map((indicator, index) => (
                                        <div key={index}>
                                            <label htmlFor={`indicators.${index}.type`} >Indicator Type</label>
                                            <Field name={`indicators.${index}.type`} as="select" className="form-control" >
                                                {
                                                    Object.keys(props.indicatorTypeOptions).map(indicatorType => (
                                                        <option value={indicatorType}>{props.indicatorTypeOptions[indicatorType]}</option>
                                                    ))
                                                }
                                            </Field>

                                            <label htmlFor={`indicators.${index}.period`} >Period</label>
                                            <Field name={`indicators.${index}.period`} as="select" className="form-control" >
                                                {
                                                    props.timePeriods.map(timePeriod => (
                                                        <option value={timePeriod}>{timePeriod}</option>
                                                    ))
                                                }
                                            </Field>

                                            <label htmlFor={`indicators.${index}.indic`} >Indicator</label>
                                            <Field name={`indicators.${index}.indic`} as="select" className="form-control" >
                                                {
                                                    props.indicatorOptions.map(indicator => (
                                                        <option value={indicator}>{indicator}</option>
                                                    ))
                                                }
                                            </Field>

                                            <label htmlFor={`indicators.${index}.comment`} >Comment</label>
                                            <Field name={`indicators.${index}.comment`} className="form-control" />

                                            <br></br>
                                            <button type="button" className="btn btn-primary" onClick={() => arrayHelper.push('')}>Add</button>
                                            {
                                                values.indicators.length > 1 ?
                                                    <button type="button" className="btn btn-warning" onClick={() => arrayHelper.remove(index)}>Remove</button> :
                                                    null
                                            }
                                            <br></br>
                                        </div>
                                    ))
                                ) :
                                    null
                                }

                                <br></br>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>

                            </>
                        )}
                    />
                </div>
            </Form>
        )}
    </Formik>
);

export default IndicatorList;