/* ----------------------------
    I will work later time forgot password and reset password.
    image- 29 and 30 for forgotpassword and resetpassword
    -----------------------------
*/

import {React,useContext} from "react";
import {Form,Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// my created component importing 
import FormTextInput from '../layout/FormTextInput';
import {AuthContext} from '../context/Auth.context'; 
import {axiosPublicInstance} from '../config/axios'
import { toast } from "react-toastify";

// form validation start here
const schema = yup.object({
    email : yup .string().required('email is required'),
});

const ForgotPassword = () => 
{
   // use form start here
   const {register, handleSubmit, formState:{ errors, isSubmitting }} = useForm({
       resolver : yupResolver(schema)
   });
   // here i will call useContext
   const {login} = useContext(AuthContext);

   const onSubmit = async (data) => 
   {
        try{
            const response = await axiosPublicInstance.post('/auth/forgot-password', 
            {
                email: data.email, // user's email
            }); 
            toast.success('Email send successfully with reset password link');
            // console.log(response);
        }catch(error){
            // console.log(error.response); 
            toast.success('Email isn\'t send successfully ');
        }
   }

    return (
        <>
        <h2 className="text-center mb-3">Forgot password</h2>
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
        <Button 
            variant="primary"
            size="md"
            type="submit"
            disabled={isSubmitting ? 'disabled' : ''}
            className='text-center d-block w-auto'
        >
           Submit    
        </Button>
        </Form>                
   </>
    );
}
export default ForgotPassword;
