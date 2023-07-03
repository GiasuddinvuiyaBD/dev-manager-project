import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import {Form, Button, ProgressBar } from "react-bootstrap";

import {axiosPrivateInstace} from '../config/axios';
import Loader from '../context/Loader';

const Profile = () => 
{
    const {user, token, userContacts} = useContext(AuthContext)
    const [submitting, setSubmitting] = useState(false)
    const [percentage, setPercentage] = useState(0);
    const [imageURL, setImageURL] = useState(null)
    const {username, email} = user;

    
    const [file,setFile] = useState(null)

    const handleChange = (evt) => 
    {
        setFile(evt.target.files[0]); 
        // console.log(evt.target.files[0])
    }

    const uploadPecentage = (loaded, complete) => 
    {
        return Math.floor((complete / loaded) * 100);
    }

    const handleSubmit = async (evt) => 
    {
        evt.preventDefault()
        // here i am create some hard coded data after practicing i will add here our user info
        const data = {
            First_Name : "Affia",
            Last_Name : "Siddiqui",
            user : user.id
        }
        // upload folder here 
        const formData = new FormData();
        formData.append('files.Image', file, file.name);
        formData.append('data', JSON.stringify(data));

        // posting data to the server.
        try{
            setSubmitting(true);
            const response = await axiosPrivateInstace.post('profiles?populate=*', 
            formData, 
            {
                onUploadProgress : (progress) => 
                {
                  // for getting loading time.
                  const percentage = uploadPecentage(progress.loaded, progress.total); 
                  setPercentage(percentage);
                }
            }
            );
            setImageURL(response.data.data.attributes?.Image?.data[0]?.attributes?.url);
            console.log(response.data.data.attributes?.Image?.data[0]?.attributes?.url);
            setSubmitting(false);
        }catch(error){
            console.log(response.error);
        }
    }
    
    // console.log(imageURL)
    return(
        <>
        <br />

            <ProgressBar  now={percentage} striped variant="success" label={`${percentage}%`} />
            {percentage > 0  && submitting && <Loader />}
            <br />

            {imageURL && <img src={imageURL} alt="profile img is not found" /> }

            <br />
           <Form onSubmit={handleSubmit}>
                <label htmlFor="profilePicture">Profile Picture</label>
                <input 
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleChange}
                 />
                 <Button type="submit"  variant="primary" disabled={submitting}>Upload</Button>
           </Form>
        </>
    )
}
export default Profile;
