import React from 'react';
import { Form } from 'react-bootstrap';


const FieldSet = ({ name, label, value, errors, touched, ...rest }) => (
    <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control name={name} value={value} isInvalid={touched && errors} {...rest} />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
    </Form.Group>
);


export default FieldSet;