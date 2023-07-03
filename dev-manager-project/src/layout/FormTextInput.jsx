import {React} from  'react'; 
import { Form, Col, Row } from 'react-bootstrap'


const FormTextInput = ({name,label,type = 'text',placeholder,defaultValue,register,errors, ...rest}) => 
{
    return (
        <Form.Group as={Row} className="mb-3">
            <Col sm={3}>
                <Form.Label htmlFor={name} column>
                    {label}
                </Form.Label>
            </Col>
            <Col sm={9}>
                <Form.Control
                    autoComplete='off' 
                    type={type}
                    id={name}
                    placeholder= {placeholder}
                    defaultValue={defaultValue}
                    {...register(name)}
                isInvalid={errors?.name}
                {...rest}
                />
                <Form.Control.Feedback type="invalid">
                    {errors[name]?.message}
                </Form.Control.Feedback>
            </Col>
        </Form.Group>
    )
}
export default FormTextInput;