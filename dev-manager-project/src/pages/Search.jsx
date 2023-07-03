import { useState, useEffect } from 'react';
import {formateContact} from '../utils/formateContact';
import {axiosPrivateInstace} from '../config/axios' ;
// import { AuthContext } from "./Auth.context";
import qs from 'qs';
import Loader from '../context/Loader';

function Search({searchInput})
{
    const [searchResults, setSearchResult] = useState(null); 
    const [loaded, setLoaded] = useState(false);
    

    useEffect(() => 
    {
        if(searchInput)
        {
            (async () => 
            {
                await getResult()
            })()
        }else{
            setLoaded(true)
        }
    }, [searchInput])
    // taking a functon for getting result 
   async function getResult()
    {  
        // send api request 
        const query = qs.stringify({
            filters: {
            $or: [
                {
                    firstName: {
                    $contains: searchInput,
                },
                },
                {
                    lastName: {
                    $contains: searchInput,
                },
                },
                {
                    bio: {
                    $contains: searchInput,
                    },
                },
            ],
            }
        });
        
        try{
            const response = await axiosPrivateInstace.get(`/contacts?${query}`);
            const data = response.data.data.map((contact) => formateContact(contact));
            setLoaded(true)
            // console.log(data)
            setSearchResult(data)
        }catch(err)
        {
            setLoaded(true)
            console.log(err)
        }
    }
    

    return(
        <>
            <h2>Search Item</h2>
            {loaded ?   
              searchResults ? (
                searchResults.map((contacts, idx) => (
                    <h2 key={idx}>{contacts.firstName } {contacts.lastName}</h2>
                ))
              ) : (<p>No Item Found</p>)
            : <Loader />
               
            }
        </>
    )
}
export default Search;