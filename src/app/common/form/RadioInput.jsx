import React from 'react'
import { Form } from 'semantic-ui-react';

const RadioInput = ({input, width, type, label}) => {
    return (
        <div>
        <Form.Field>
            <div className="ui radio">
                <input {...input} type={type}/>
                <label>{label}</label>
            </div>
        </Form.Field>
            
        </div>
    )
}

export default RadioInput
