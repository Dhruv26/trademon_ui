import React from 'react';
import { Formik, FieldArray } from 'formik';
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
            {({ values, touched, errors, handleSubmit, handleBlur, handleChange, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Form.Group controlId="stockName">
                            <Form.Label>Stock Name</Form.Label>
                            <Form.Control name="stockName" type="text" value={values.stockName} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.stockName && errors.stockName} />
                            <Form.Control.Feedback type="invalid">{errors.stockName}</Form.Control.Feedback>
                        </Form.Group>

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
                                                    <Form.Group controlId={`indicatorGroups.${index}.groupName`}>
                                                        <Form.Label>Group Name</Form.Label>
                                                        <Form.Control name={`indicatorGroups.${index}.groupName`} type="text" value={indicatorGroups[index].groupName} onChange={handleChange} onBlur={handleBlur} />
                                                    </Form.Group>

                                                    <FieldArray
                                                        id={`indicatorGroups.${index}.indicators`}
                                                        name={`indicatorGroups.${index}.indicators`}
                                                        render={arrayHelpers2 => {
                                                            return (
                                                                <div>
                                                                    {indicatorGroups[index].indicators && indicatorGroups[index].indicators.length > 0 ? (
                                                                        <div>
                                                                            {indicatorGroups[index].indicators.map((q, indicatorIndex) => {
                                                                                return (
                                                                                    <div>
                                                                                        <h6 htmlFor={`indicatorGroups.${index}.indicators`}>{`Indicator ${indicatorIndex + 1}`}</h6>
                                                                                        <Form.Group controlId={`indicatorGroups.${index}.indicators.${indicatorIndex}.type`}>
                                                                                            <Form.Label>Indicator Type</Form.Label>
                                                                                            <Form.Control name={`indicatorGroups.${index}.indicators.${indicatorIndex}.type`} as="select" value={indicatorGroups[index].indicators[indicatorIndex].type} onChange={handleChange} onBlur={handleBlur} >
                                                                                                <option value="">None</option>
                                                                                                {
                                                                                                    props.indicatorTypeOptions ? (
                                                                                                        Object.keys(props.indicatorTypeOptions).map(indicatorType => (
                                                                                                            <option value={indicatorType}>{props.indicatorTypeOptions[indicatorType]}</option>
                                                                                                        ))
                                                                                                    ) : null
                                                                                                }
                                                                                            </Form.Control>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId={`indicatorGroups.${index}.indicators.${indicatorIndex}.period`}>
                                                                                            <Form.Label>Period</Form.Label>
                                                                                            <Form.Control name={`indicatorGroups.${index}.indicators.${indicatorIndex}.period`} as="select" value={indicatorGroups[index].indicators[indicatorIndex].period} onChange={handleChange} onBlur={handleBlur} >
                                                                                                <option value="">None</option>
                                                                                                {
                                                                                                    props.timePeriods ? (
                                                                                                        props.timePeriods.map(timePeriod => (
                                                                                                            <option value={timePeriod}>{timePeriod}</option>
                                                                                                        ))
                                                                                                    ) : null
                                                                                                }
                                                                                            </Form.Control>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId={`indicatorGroups.${index}.indicators.${indicatorIndex}.indicator`}>
                                                                                            <Form.Label>Indicator</Form.Label>
                                                                                            <Form.Control name={`indicatorGroups.${index}.indicators.${indicatorIndex}.indicator`} as="select" value={indicatorGroups[index].indicators[indicatorIndex].indicator} onChange={handleChange} onBlur={handleBlur} >
                                                                                                <option value="">None</option>
                                                                                                {
                                                                                                    props.indicatorOptions ? (
                                                                                                        props.indicatorOptions.map(indicator => (
                                                                                                            <option value={indicator}>{indicator}</option>
                                                                                                        ))
                                                                                                    ) : null
                                                                                                }
                                                                                            </Form.Control>
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId={`indicatorGroups.${index}.indicators.${indicatorIndex}.value`}>
                                                                                            <Form.Label>Value</Form.Label>
                                                                                            <Form.Control name={`indicatorGroups.${index}.indicators.${indicatorIndex}.value`} type="text" value={indicatorGroups[index].indicators[indicatorIndex].value} onChange={handleChange} onBlur={handleBlur} />
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId={`indicatorGroups.${index}.indicators.${indicatorIndex}.comment`}>
                                                                                            <Form.Label>Comment</Form.Label>
                                                                                            <Form.Control name={`indicatorGroups.${index}.indicators.${indicatorIndex}.comment`} as="textarea" value={indicatorGroups[index].indicators[indicatorIndex].comment} onChange={handleChange} onBlur={handleBlur} />
                                                                                        </Form.Group>

                                                                                        <Form.Group controlId={`indicatorGroups.${index}.indicators.${indicatorIndex}.dateRef`}>
                                                                                            <Form.Label>Date Ref</Form.Label>
                                                                                            <Form.Control name={`indicatorGroups.${index}.indicators.${indicatorIndex}.dateRef`} type="text" value={indicatorGroups[index].indicators[indicatorIndex].dateRef} onChange={handleChange} onBlur={handleBlur} />
                                                                                        </Form.Group>

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
                        <h4>{JSON.stringify(errors)}</h4>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default IndicatorList;