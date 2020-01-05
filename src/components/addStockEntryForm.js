import React from 'react';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css";


const INDICATORS_INITIAL_VALUE = {
    type: "",
    period: "",
    indicator: "",
    value: "",
    comment: "",
    dateRef: ""
};

const INDICATOR_GROUP_INITIAL_VALUE = {
    groupName: "",
    indicators: [
        INDICATORS_INITIAL_VALUE
    ]
};

const INITIAL_VALUES = {
    stockName: "",
    indicatorGroups: [
        INDICATOR_GROUP_INITIAL_VALUE
    ],
};


const VALIDATION_SCHEMA = Yup.object().shape({
    stockName: Yup.string().required("Stock name is required."),
    indicatorGroups: Yup.array()
        .min(1, "Must have at least 1 Indicator Group.")
        .required("Must have indicator Groups"),
});

const IndicatorList = (props) => {
    let history = useHistory();
    return (
        <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={values => {
                console.log(`POSTING Values: ${JSON.stringify(values, null, 4)}`);
                fetch("http://localhost:5000/add", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 500);
                history.push("/");
            }}
        >
            {({ values, touched, errors, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="stockName">Stock Name</label>
                        <Field name="stockName" className={`form-control ${touched.stockName && errors.stockName ? "is-invalid" : ""}`} />
                        <ErrorMessage component="div" name="stockName" className="invalid-feedback" />

                        <FieldArray
                            name="indicatorGroups"
                            render={arrayHelpers => {
                                const indicatorGroups = values.indicatorGroups;

                                return (
                                    <div>
                                        {indicatorGroups && indicatorGroups.length > 0 ? (
                                            indicatorGroups.map((group, index) => (
                                                <div key={index}>
                                                    <h5>{`Indicator Group: ${index + 1}`}</h5>
                                                    <label htmlFor={`indicatorGroups.${index}.groupName`}>Group Name</label>
                                                    <Field name={`indicatorGroups.${index}.groupName`} className="form-control" />

                                                    <FieldArray
                                                        id={`indicatorGroups.${index}.indicators`}
                                                        name={`indicatorGroups.${index}.indicators`}
                                                        render={arrayHelpers2 => {
                                                            return (
                                                                <div>
                                                                    {indicatorGroups[index].indicators && indicatorGroups[index].indicators.length > 0 ? (
                                                                        <div style={{ marginLeft: 10, marginTop: 10 }}>
                                                                            {indicatorGroups[index].indicators.map((q, indicatorIndex) => {
                                                                                return (
                                                                                    <div>
                                                                                        <h6 htmlFor={`indicatorGroups.${index}.indicators`}>{`Indicator ${indicatorIndex + 1}`}</h6>
                                                                                        <label htmlFor={`indicatorGroups.${index}.indicators.${indicatorIndex}.type`} >Indicator Type</label>
                                                                                        <Field name={`indicatorGroups.${index}.indicators.${indicatorIndex}.type`} as="select" className="form-control" >
                                                                                            <option value="">None</option>
                                                                                            {
                                                                                                props.indicatorTypeOptions ? (
                                                                                                    Object.keys(props.indicatorTypeOptions).map(indicatorType => (
                                                                                                        <option value={indicatorType}>{props.indicatorTypeOptions[indicatorType]}</option>
                                                                                                    ))
                                                                                                ) : null
                                                                                            }
                                                                                        </Field>

                                                                                        <label htmlFor={`indicatorGroups.${index}.indicators.${indicatorIndex}.period`} >Period</label>
                                                                                        <Field name={`indicatorGroups.${index}.indicators.${indicatorIndex}.period`} as="select" className="form-control" >
                                                                                            <option value="">None</option>
                                                                                            {
                                                                                                props.timePeriods ? (
                                                                                                    props.timePeriods.map(timePeriod => (
                                                                                                        <option value={timePeriod}>{timePeriod}</option>
                                                                                                    ))
                                                                                                ) : null
                                                                                            }
                                                                                        </Field>

                                                                                        <label htmlFor={`indicatorGroups.${index}.indicators.${indicatorIndex}.indicator`} >Indicator</label>
                                                                                        <Field name={`indicatorGroups.${index}.indicators.${indicatorIndex}.indicator`} as="select" className="form-control" >
                                                                                            <option value="">None</option>
                                                                                            {
                                                                                                props.indicatorOptions ? (
                                                                                                    props.indicatorOptions.map(indicator => (
                                                                                                        <option value={indicator}>{indicator}</option>
                                                                                                    ))
                                                                                                ) : null
                                                                                            }
                                                                                        </Field>

                                                                                        <label htmlFor={`indicatorGroups.${index}.indicators.${indicatorIndex}.value`} >Value</label>
                                                                                        <Field name={`indicatorGroups.${index}.indicators.${indicatorIndex}.value`} className="form-control" />

                                                                                        <label htmlFor={`indicatorGroups.${index}.indicators.${indicatorIndex}.comment`} >Comment</label>
                                                                                        <Field name={`indicatorGroups.${index}.indicators.${indicatorIndex}.comment`} className="form-control" />

                                                                                        <label htmlFor={`indicatorGroups.${index}.indicators.${indicatorIndex}.dateRef`} >Date Ref</label>
                                                                                        <Field name={`indicatorGroups.${index}.indicators.${indicatorIndex}.dateRef`} className="form-control" />

                                                                                        <Button type="button" variant="outline-secondary" onClick={() => arrayHelpers2.push('')}>
                                                                                            Add Indicator
                                                                                    </Button>
                                                                                        <Button type="button" variant="outline-danger" onClick={() => arrayHelpers2.remove(index)}>
                                                                                            Remove Indicator
                                                                                    </Button>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    ) : (
                                                                            <Button type="button" variant="outline-secondary" onClick={() => arrayHelpers2.push('')}>
                                                                                Add new Indicator
                                                                        </Button>
                                                                        )}
                                                                </div>
                                                            );
                                                        }}
                                                    />

                                                    <Button type="button" variant="outline-secondary" onClick={() => arrayHelpers.push({ indicatorType: '', indicators: [''] })}>
                                                        Add Indicator Group
                                                </Button>
                                                    <Button type="button" variant="outline-danger" onClick={() => arrayHelpers.remove(index)}>
                                                        Remove Indicator Group
                                                </Button>
                                                </div>
                                            ))
                                        ) : (
                                                <Button type="button" variant="outline-secondary" onClick={() => arrayHelpers.push('')}>
                                                    Add Indicator Group
                                            </Button>
                                            )}
                                    </div>
                                );
                            }}
                        />
                        <Button type="submit" variant="success" disabled={isSubmitting} block>Submit</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default IndicatorList;