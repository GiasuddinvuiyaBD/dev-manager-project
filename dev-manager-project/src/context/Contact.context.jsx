import { createContext,useContext,useEffect,useReducer,useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import qs from 'qs';

import {DELETE_CONTACTS,ADD_CONTACT,UPDATE_CONTACT,LOAD_CONTACTS} from './type';
import contactsReducer from './reducer';
import {axiosPrivateInstace} from '../config/axios' ;
import {formateContact} from '../utils/formateContact';
import { AuthContext } from "./Auth.context";


// create a context 
export const ContactContext = createContext(); 
// here inital data 
const initalCountacts = [ 
    {
      id : '1',
      firstName : 'kamal',
      lastName : 'miah', 
      email : 'kamal@gmail.com', 
      profession : 'Softwer Developer',
      gender : 'male', 
      image : 'https://media.licdn.com/dms/image/C5603AQEHSRs8uT3shQ/profile-displayphoto-shrink_800_800/0/1605930306741?e=2147483647&v=beta&t=PLdgXh0wbb1sNr4U9S5yOrg2oRd48vbrzqemkgoGHhI',
      dateOfBirth : '01/04/2004', 
      bio : 'This is all about me.',
    },
    {
      id : '2',
      firstName : 'Tamim',
      lastName : 'miah', 
      email : 'tajinakter@gmail.com', 
      profession : 'Web Developer',
      gender : 'male', 
      image : 'https://media.istockphoto.com/id/1197071216/photo/portrait-of-a-smart-and-handsome-it-specialist-wearing-glasses-smiles-behind-him-personal.jpg?s=612x612&w=0&k=20&c=Dy8TjvDmeXWhR6gAZ_OuqLu3ytUJmtycEYdVQenpWoI=',
      dateOfBirth : '05/02/2000', 
      bio : 'This is all about me.',
    },
    {
      id : '3',
      firstName : 'Fahad',
      lastName : 'sharkar', 
      email : 'fahad33@gmail.com', 
      profession : 'Softwer Enginner',
      gender : 'male', 
      image : 'https://www.dice.com/binaries/large/content/gallery/dice/insights/2021/08/shutterstock_510397921.jpg',
      dateOfBirth : '23/09/2002', 
      bio : 'This is all about me.',
    },
    {
      id : '4',
      firstName : 'Imran',
      lastName : 'Khan', 
      email : 'imrankhan@gmail.com', 
      profession : 'App Develpoer',
      gender : 'male', 
      image : 'https://media.istockphoto.com/id/1139883652/photo/using-laptop-at-home.jpg?s=612x612&w=0&k=20&c=2umvWKNmUmHRtqn8hDcv444A1icXthOWlI8_UiYEpN0=',
      dateOfBirth : '21/21/2016', 
      bio : 'This is all about me.',
    },
    {
      id : '5',
      firstName : 'Rahman ',
      lastName : 'miah', 
      email : 'rohmahnks33@gmail.com', 
      profession : 'IOS Develpoer',
      gender : 'male', 
      image : 'https://www.akkodis.com/-/media/project/akkodis/akkodis/images/campaign-images/software-developer-vs-software-engineer-1200width.jpg?h=630&iar=0&w=1200&hash=6BA7BE5FE2F910D8512A3EF3EF7078EA',
      dateOfBirth : '18/08/2006', 
      bio : 'This is all about me.',
    },
    {
      id : '6',
      firstName : 'Burhan ',
      lastName : 'wany', 
      email : 'burhanwany@gmail.com', 
      profession : 'Application Develpoer',
      gender : 'male', 
      image : 'https://thumbs.dreamstime.com/b/young-software-engineer-working-office-headphones-his-head-41329127.jpgg',
      dateOfBirth : '27/02/2009', 
      bio : 'This is all about me.',
    },
    {
      id : '7',
      firstName : 'Mostakim ',
      lastName : 'Sharkar', 
      email : 'mostakim33l@gmail.com', 
      profession : 'Web Develpoer',
      gender : 'male', 
      image : 'https://i.ytimg.com/vi/jw98oh8HF5o/maxresdefault.jpg',
      dateOfBirth : '27/02/1990', 
      bio : 'Hello every one how are you all? This is all about me.',
    },
    {
      id : '8',
      firstName : 'Robya ',
      lastName : 'Akter', 
      email : 'robyasks@gmail.com', 
      profession : 'AI developer',
      gender : 'female', 
      image : 'https://www.google.com/logos/doodles/2023/bangladesh-independence-day-2023-6753651837109856.2-2xa.gif',
      dateOfBirth : '27/02/1990', 
      bio : 'Bangladeshes independent day',
    },
  ];

// provite a context
export const ProvideContext = ({children}) => 
{
    // i will use here reducer
    const [contacts, dispatch] = useReducer(contactsReducer, initalCountacts)
    const [loaded, setLoaded] = useState(false); 
    const [pageCount, setPageCount] = useState(1);
    const [pageNumber, setPageNumber] = useState(null); 
    const [searchInput, setSearchInput] = useState(null);

    const {user} = useContext(AuthContext); 
    const {token} = useContext(AuthContext); 
    
    const navigate = useNavigate()
    // console.log(token)

    useEffect(() => 
    {
      if(token)
      {
        (async() => 
        {
          await loadContext()
        })();
      // when browser will be loaded at that time it will be call
      }
    },[token, pageNumber]);

    // loadContext start here
    const loadContext = ( async () => 
    {
      const quary = qs.stringify({
        sort: ['id:desc'],
        populate : '*',
        pagination : {
          page : pageNumber,
          // pageSize : 2,
          pageSize : import.meta.env.VITE_PAGE_SIZE
        }
      },
      {
        encodeValuesOnly: true,
      }
      );

      try
      {
        const response =  await axiosPrivateInstace.get(`/contacts?${quary}`); 
        const loadContexts = response.data.data.map((contact) => formateContact(contact)); 
        // console.log(loadContexts);
        dispatch({type : LOAD_CONTACTS, payload : loadContexts});
        setPageCount(response.data.meta.pagination.pageCount);
        setLoaded(true);

      }catch(error)
      {
        console.log(error.response)
      } 
    }); 

    // delete contact
    const deleteContact = async (id) => 
    {
      try{
        const response = await axiosPrivateInstace.delete(`/contacts/${id}`); 
        // show success message.
        toast.success('Contact is delete successfully');
        // navigate
        navigate('/contacts');
        // console.log(response.data);
        dispatch({type : DELETE_CONTACTS, payload : id}); 
      }catch(error)
      {
        toast.error(error.response?.data?.error?.message)
      }
    }


    // adding contact
    const addContact = async (contactData) => 
    {
      contactData = {
        author : user.id,
        ...contactData,
      }
      try{
        const response = await axiosPrivateInstace.post('/contacts', 
        {
          data: contactData,
        });
        // database a data joma hoare por ei data asbe
        const contact = formateContact(response.data.data);
        // adding contact 
        dispatch({type : ADD_CONTACT, payload : contact});
        // toast message 
        toast.success('contact is added Successfully');
        // rediract to contacts 
        navigate('/contacts');
      }catch(error)
      { 
        console.log(error.response)
      }
    } 

    // update item start here
    const updateContact = (updatedData, id) => 
    {
      dispatch({type : UPDATE_CONTACT, payload : {updatedData,id}});
    }
  
    const value = 
    {
        loaded,
        contacts,
        deleteContact,
        addContact,
        updateContact, 
        pageCount,
        pageNumber,
        setPageNumber,
    }
    return(
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
}