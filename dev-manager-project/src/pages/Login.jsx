import {React,useContext} from "react";
import {Form,Button} from "react-bootstrap";
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from "react-router-dom";
// my created component importing 
import FormTextInput from '../layout/FormTextInput';
import {AuthContext} from '../context/Auth.context'

function Login() 
{
    // form validation start here
    const schema = yup.object({
        email : yup 
        .string()
        .required('email is required'),

        password : yup 
        .string(), 
    });

    // use form start here
    const {register, handleSubmit, formState:{ errors, isSubmitting }} = useForm({
        resolver : yupResolver(schema)
    });
    
    // here i will call useContext
    const {login} = useContext(AuthContext)
    const onSubmit = (data) => 
    {
        login({
           identifier : data.email,
           password : data.password
        })
    }

    return (
       <>
            <h2 className="text-center mb-3">Register page</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
            {/* email start */}
                <FormTextInput 
                    name = 'email'
                    label = 'Email Address'
                    placeholder = 'Enter Your Email Address'
                    errors={errors}
                    register={register}
                    type='email'
                    defaultValue='aafia2023@gmail.com'
                /> 
            {/* eamil end */}
            {/* password start */}
                <FormTextInput 
                    name = 'password'
                    label = 'Password'
                    placeholder = 'Enter a password'
                    errors={errors}
                    register={register}
                    type='password'
                    defaultValue='abcdeFf1@'
                /> 
             {/* password end */}

             <p>Forgot Password ? <Link to='/forgot-password'> Click Here</Link></p>
              {/* button start here */}
            <Button 
                variant="primary"
                size="md"
                type="submit"
                disabled={isSubmitting ? 'disabled' : ''}
                className='text-center d-block w-auto'
            >
               Login    
            </Button>
            </Form>                
       </>
    )
}

export default Login;