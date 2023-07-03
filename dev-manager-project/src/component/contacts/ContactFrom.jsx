
import { useEffect, useState,useContext } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
// import ContactFrom from 'contacts/ContactFrom';
import DatePicker from 'react-datepicker'
// here i will start to import react from and yun
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContactContext } from '../../context/Contact.context';
import FormTextInput from '../../layout/FormTextInput';


const schema = yup.object({
    firstName : yup
    .string()
    .required('First name is required')
    .min(3,'Length must be 3 charactor'),

    lastName : yup 
    .string()
    .required('Last Name is required')
    .min(3, 'Minimum length must be 3 charactor'),

    email : yup 
    .string()
    .required('Email field is required')
    .email('Your must have to pass email address.'),

    profession : yup 
    .string()
    .required('profession is required')
    .min(3,'minimum length must be 3 charactor')
    .oneOf(['Software Enginner','IOS Developer','AI Developer']),
    
    image : yup 
    .string()
    .required('image field is required')
    .url('Must be valid URL'),

    gender : yup 
    .mixed('you have to select gender').oneOf(['male', 'female']),
    
    bio : yup
    .string()
    .required('message is required')
    .min(10, 'minimum length is 10')
    .max(300, 'maximum length is 3000')
}); 

function AddContact({contact})
{
    // addContact start here 
    const {addContact,updateContact} = useContext(ContactContext); 
    // console.log(addContact)
    // end 
// here i will stated my react form hoook
const {register, handleSubmit,watch,reset, formState: {errors,isSubmitting,isSubmitSuccessful}} = useForm({
    resolver : yupResolver(schema),
});

const navigate = useNavigate(); 

const defaultValue = 
{
    firstName : contact?.firstName || 'Najim',
    lastName : contact?.lastName || 'Vuiya',
    email : contact?.email || 'najim33@gmail.com', 
    profession : 'software_enginner' || contact?.profession, 
    image : contact?.image || 'https://media.istockphoto.com/id/1061031056/photo/pre-adolescent-boy-programming-at-computer.jpg?s=612x612&w=0&k=20&c=ZpdMz3WOKlahnBBOzeue4fdSIyzlZyHyfW4t9qi_xHQ=', 
    bio : contact?.bio || 'Hello world, This is all about me.', 
    gender : 'male' ||  contact?.gender, 
    dateOfBirth : contact?.dateOfBirth || new Date(),
}

const {firstName,lastName,email,profession,image,bio,gender,dateOfBirth} = defaultValue;
const [birthYear,setBirthYear] = useState(dateOfBirth ? dateOfBirth : new Date());

// after submit the form it will be reset
useEffect(() => 
{
    if(isSubmitSuccessful)
    {
        reset({
            firstName : '',
            lastName : '',
            email : '', 
            image : '',
            bio : '', 
            gender : 'male', 
            profession : '', 
            dateOfBirth : '',
        })
    }
},[isSubmitSuccessful]);

const onSubmit = data => 
{
    const id = contact?.id; 
    if(id)
    {   
        updateContact(data, id);
        toast.success('Contact is updated successfully');
    }else{
        addContact(data);
        // toast.success('Contact is successfully added');
    }
    navigate('/contacts')
}
    return(
        <>
            <h2 className='text-center' >{contact?.id ? 'Edit Contact' : 'Add Contact'}</h2>
           <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* firstName start*/}
                <FormTextInput 
                    name = 'firstName'
                    label= 'First Name'
                    placeholder= 'Enter Your First Name...'
                    defaultValue={firstName}
                    register={register}
                    errors={errors}
                /> 
            {/* firstName end */}

            {/* lastName start */}
                <FormTextInput 
                    name = 'lastName'
                    label = 'Last Name'
                    placeholder = 'Enter Your Last Name'
                    defaultValue={lastName}
                    register={register}
                    errors={errors}
                /> 
             {/* lastName end */}

             {/* email start */}
             <FormTextInput 
                    name = 'email'
                    label = 'Email Address'
                    placeholder = 'Enter Your Email Address'
                    defaultValue={email}
                    register={register}
                    errors={errors}
                /> 
             {/* eamil end */}
                <Form.Group as={Row} className="mb-3">
                    <Col sm={3}>
                        <Form.Label htmlFor="profession" column>Profession</Form.Label>
                    </Col>
                    <Col sm={9}>

                    {/* select option start here */}
                    <Form.Select 
                        defaultValue={profession}
                         type="text"
                         id="profession" 
                         {...register('profession')}
                        isInvalid={errors?.profession}
                        aria-label="Default select example"
                    >
                        <option value=''>Select your profession</option>
                        <option value="Software Enginner">Software Enginner</option>
                        <option value="IOS Developer">IOS Developer</option>
                        <option value="AI Developer">AI Developer</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {errors?.profession?.message}
                    </Form.Control.Feedback>
                </Col>
                </Form.Group>
                
            {/* image start */}
                  <FormTextInput 
                    name = 'image'
                    label = 'Image'
                    placeholder = 'Enter Link of Your profile picture'
                    defaultValue={image}
                    register={register}
                    errors={errors}
                /> 
             {/* image end */}

                {/* date start here  */}
                <Form.Group as={Row} className="mb-3">
                    <Col sm={3}>
                        <Form.Label htmlFor="deatOfBirth" column>Date Of Birth</Form.Label>
                    </Col>
                    <Col sm={9}>
                        <DatePicker 
                            // selected={birthYear}
                            name = "dateOfBirth"
                            id = "dateOfBirth"
                            placeholder = "Enter your date of birth"
                            maxDate={new Date()}
                            showMonthDropdown
                            onChange={(date) => setBirthYear(date)}
                        /> 
                    </Col>
                </Form.Group>
{/* gender start here */}
                 <Form.Group as={Row} className="mb-3">
                    <Col sm={3}>
                        <Form.Label htmlFor="gender" column>Gender</Form.Label>
                    </Col>
                   <Col xs='auto'>
                        <Form.Check                   
                        type="radio"
                        // value={gender}
                        id='gender'
                        label='Male'
                        value='male'
                        defaultChecked = {gender === 'male'}
                        {...register('gender')}
                        />
                   </Col>
                   <Col xs='auto'>
                        <Form.Check       
                        type="radio"
                        id='gender'
                        label='Femele'
                        value='female'
                        // defaultChecked = {gender === 'female'}
                        {...register('gender')}
                        />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.gender?.message}
                        </Form.Control.Feedback>
                   </Col>
                </Form.Group>
{/* gender end here */}
            {/* bio start */}
                <FormTextInput 
                    name = 'bio'
                    label = 'Bio'
                    placeholder = 'Write something about you.'
                    defaultValue={bio}
                    register={register}
                    errors={errors}
                    as='textarea'
                /> 
            {/* bio end */}
               <Button 
                className='submitBtnDesign'
                variant="primary"
                size="md"
                type="submit"
                disabled={isSubmitting ? 'disabled' : ''} // disabled is not working
                >
                    {contact?.id ? 'Update Contact' : 'Add Contact'}
                </Button>
           </Form>
        </>
    )
}

export default AddContact;
