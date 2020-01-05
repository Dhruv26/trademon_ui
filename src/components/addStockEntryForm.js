import React from 'react';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.css";

const INITIAL_VALUES = {
    stockName: "",
    indicatorGroup: [
        {
            type: "RSI",
            period: "DAILY",
        }
    ],
};


const VALIDATION_SCHEMA = Yup.object().shape({
    stockName: Yup.string().required("Stock name is required."),
    indicatorGroup: Yup.array()
        .min(1, "Must have at least 1 Indicator.")
        .required("Must have indicatorGroup"),
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
        {({ values, touched, errors, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="stockName">Stock Name</label>
                    <Field name="stockName" className={`form-control ${touched.stockName && errors.stockName ? "is-invalid" : ""}`} />
                    <ErrorMessage component="div" name="stockName" className="invalid-feedback" />
                    
                    <FieldArray
                        name="indicatorGroup"
                        render={arrayHelper => (
                            <>
                                {values.indicatorGroup && values.indicatorGroup.length > 0 ? (
                                    values.indicatorGroup.map((indicator, index) => (
                                        <div key={index}>
                                            <label htmlFor={`indicatorGroup.${index}.type`} >Indicator Type</label>
                                            <Field name={`indicatorGroup.${index}.type`} as="select" className="form-control" >
                                                {
                                                    Object.keys(props.indicatorTypeOptions).map(indicatorType => (
                                                        <option value={indicatorType}>{props.indicatorTypeOptions[indicatorType]}</option>
                                                    ))
                                                }
                                            </Field>

                                            <label htmlFor={`indicatorGroup.${index}.period`} >Period</label>
                                            <Field name={`indicatorGroup.${index}.period`} as="select" className="form-control" >
                                                {
                                                    props.timePeriods.map(timePeriod => (
                                                        <option value={timePeriod}>{timePeriod}</option>
                                                    ))
                                                }
                                            </Field>

                                            <label htmlFor={`indicatorGroup.${index}.indic`} >Indicator</label>
                                            <Field name={`indicatorGroup.${index}.indic`} as="select" className="form-control" >
                                                {
                                                    props.indicatorOptions.map(indicator => (
                                                        <option value={indicator}>{indicator}</option>
                                                    ))
                                                }
                                            </Field>

                                            <label htmlFor={`indicatorGroup.${index}.comment`} >Comment</label>
                                            <Field name={`indicatorGroup.${index}.comment`} className="form-control" />

                                            <br></br>
                                            <Button type="button" variant="secondary" onClick={() => arrayHelper.push('')} >Add Indicator</Button>
                                            <Button type="button" variant="warning" onClick={() => arrayHelper.remove(index)} disabled={values.indicatorGroup.length <= 1} >Remove Indicator</Button>
                                            <br></br>
                                        </div>
                                    ))
                                ) :
                                    <Button type="button" variant="secondary" onClick={() => arrayHelper.push('')} >Add Indicator</Button>
                                }
                            </>
                        )}
                    />
                    <br></br>
                    <Button type="submit" variant="primary" block>Submit</Button>
                </div>
            </Form>
        )}
    </Formik>
);

export default IndicatorList;