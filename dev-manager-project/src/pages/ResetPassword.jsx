import {React,useContext} from "react";
import {Form,Button} from "react-bootstrap";
import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/* ----------------------------
    I will work later time forgot password and reset password.
    image- 29 and 30 for forgotpassword and resetpassword
    -----------------------------
*/


// my created component importing 
import FormTextInput from '../layout/FormTextInput';
import {AuthContext} from '../context/Auth.context'; 


// form validation start here
const schema = yup.object({
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



const ResetPassword = () => 
{
   // use form start here
   const {register, handleSubmit, formState:{ errors, isSubmitting }} = useForm({
    resolver : yupResolver(schema)
    });
    // here i will call useContext
    const {login} = useContext(AuthContext)
    const onSubmit = (data) => 
    {
        
    }
    return(
        <>
        <h2 className="text-center mb-3">Reset password</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Button 
            variant="primary"
            size="md"
            type="submit"
            disabled={isSubmitting ? 'disabled' : ''}
            className='text-center d-block w-auto'
        >
        Reset Password 
    </Button>
    </Form>                
   </>
    )
}

export default ResetPassword;
