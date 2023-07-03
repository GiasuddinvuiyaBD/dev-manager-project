import {React,useContext} from "react";
import {Form,Button} from "react-bootstrap";
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// my created component importing 
import FormTextInput from '../layout/FormTextInput';
import {AuthContext} from '../context/Auth.context'

function Register() 
{
    // form validation start here
    const schema = yup.object({

        username: yup
        .string()
        .required('user name is requied')
        .min(5, 'user name must be 5 or more charactor in length'),
        
        email : yup 
        .string()
        .required('email is required')
        .email('must be valid email')
        .lowercase(),

        password : yup 
        .string() 
        .required('password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, 
        'Must contains 6 Charactores, One Uppder case, One Lowercase, One Number and One Special Case'
        ),
         
        confirmPassword : yup 
        .string() 
        .required('confirm password is required.')
        .oneOf([yup.ref('password')], "confirm password does't match")
    });

    // use form start here
    const {register, handleSubmit, formState:{ errors, isSubmitting }} = useForm({
        resolver : yupResolver(schema)
    });
    
    // here i will call useContext
    const {registerUser} = useContext(AuthContext)

    const onSubmit = (data) => 
    {
        registerUser({
            'username' : data.username,
            'email' : data.email,
            'password' : data.password
        })
    }

    return (
       <>
            <h2 className="text-center mb-3">Register page</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* username start*/}
                <FormTextInput 
                    name = 'username'
                    label= 'User Name'
                    placeholder= 'Enter Your User Name'
                    errors={errors}
                    register={register}
                    type='username'
                    defaultValue='Aafia Siddiqui'
                /> 
            {/* username end */}

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
             {/* confirm password start */}
                <FormTextInput 
                    name = 'confirmPassword'
                    label = 'Confirm Password'
                    placeholder = 'Confirm Your Password'
                    errors={errors}
                    register={register}
                    type='password'
                    defaultValue='abcdeFf1@'
                /> 
              {/* password end */}

              {/* button start here */}
            <Button 
                variant="primary"
                size="md"
                type="submit"
                disabled={isSubmitting ? 'disabled' : ''}
                className='text-center d-block w-auto'
            >
               Register    
            </Button>

            </Form>                
       </>
    )
}


export default Register;