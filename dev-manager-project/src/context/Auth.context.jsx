import { createContext, useState, useEffect} from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import qs from 'qs';
// accessing axiosPublicInstance form axios
import {axiosPrivateInstace, axiosPublicInstance} from '../config/axios';
import { formateContact } from "../utils/formateContact";

export const AuthContext = createContext(); 
const loadUser = JSON.parse(localStorage.getItem('user'));
const loadToken = JSON.parse(localStorage.getItem('token'));

export const AuthProvider = ({children}) => 
{
    const [user, setUser] = useState(loadUser ? loadUser :  null); 
    const [token, setToekn] = useState(loadToken ? loadToken : null); 
    const [userContacts, setUserContacts] = useState(null); 
    const [loaded, setLoaded] = useState(false);
    const [triggerDelete, setTriggerDelete] = useState(false);
    const [profileId, setProfileId] = useState(null);
    const navigate = useNavigate(); 
    const location = useLocation();
    
    const registerUser = async (data) => 
    {
        try{
            const response = await axiosPublicInstance.post(
            'auth/local/register',
             data
            );
            // console.log(response.data)
            const {user,jwt} = response.data;
            // we will save this data when we need to thise data those time we will take form localStorage
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(jwt))
            // i have passed user data and jwt key
            setUser(user)
            setToekn(jwt)
            // see data 
            toast.success('Register successfully redirecting....');
            // rediracting the user
            navigate(location?.state?.from ? location?.state?.from : '/contacts' );
        }catch(error)
        {
            toast.error(error.response?.data?.error?.message)
            // console.log(error.response?.data?.error?.message)
        }
    }

    // load user profile
    useEffect(() => 
    {
        if(token &&  loaded)
        {
            (async () => 
            {
                await loadUserProfile();
            })();
        }
    }, [user,loaded]);

    // load user
    useEffect(() => 
    {
        (async () => 
        {
            await loadUserContact();
        })();
    }, [user,triggerDelete]);

    const loadUserProfile = async () => 
    {
        const quary = qs.stringify(
            {
                populate : ['Image', 'user','user.contacts'],
            },
            {
                encodeValuesOnly: true, // prettify URL
            }
        );
        
        try{
            // const response = await axiosPrivateInstace.get('/users/me?populate=*'); 
            const response = await axiosPrivateInstace.get(`/profiles/${profileId}?${quary}`);
            const mappedContacts = response.data.data.attributes.user.data.attributes.contacts.data.map(
                (contacts) =>  formateContact(contacts)
            );

            // console.log(mappedContacts);
            // console.log(response.data);

            setLoaded(true);
        }catch(error){
            console.log(error.data); 
            setLoaded(true);
        }
    }

    const loadUserContact = async () => 
    {    
       const quary = qs.stringify(
        {
            // populate : '*'
            populate : ['profile', 'profile.image', 'contacts']
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
       )
        try{
            // const response = await axiosPrivateInstace.get('/users/me?populate=*'); 
            const response = await axiosPrivateInstace.get(`/users/me?${quary}`);
            setUserContacts(response.data.contacts);
            setLoaded(true);
            // console.log(response.data);
            setProfileId(response.data.profile.id);
        }catch(error){
            console.log(error.data); 
            setLoaded(true);
        }
    }
    

    const login =  async (data) => {
        try{
            const response = await axiosPublicInstance.post(
            'auth/local',
             data
            );
            // console.log(response.data)  
            const {user,jwt} = response.data;
            // we will save this data when we need to thise data those time we will take form localStorage
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(jwt))
            // i have passed user data and jwt key
            setUser(user)
            setToekn(jwt)
            // see data 
            
            toast.success('Login successfully redirecting....');
            // rediracting the user
            navigate('/contacts');
        }catch(error)
        {
            toast.error(error.response?.data?.error?.message)
            // console.log(error.response?.data?.error?.message)
        }
    }

    const logout = () => {
        // remove data form localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        // remove data form state 
        setUser(null); 
        setToekn(null); 
        toast.success('Logout successfully redirectly....'); 
        navigate('/')
    }

    const value = {
        setTriggerDelete,
        userContacts,
        loaded,
        user,
        token,
        registerUser,
        login,
        logout,
        profileId,
        userName : 'Rosy akter'
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}