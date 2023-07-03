// import Contact from "./Contact";
import React from 'react'
import Contact from "../component/contacts/Contact";
import Loader from "../context/Loader";
import Pagination from 'react-bootstrap/Pagination';
import {ContactContext} from '../context/Contact.context'
import { useContext } from 'react';

 
// generate count fun
const generateArr = (number) => 
{
    let arr = []; 

    for(let i = 1; i <= number; i++)
    {
        arr.push(i)
    }
    return arr;
}


function Contacts({contacts})
{
    const {loaded, pageNumber, pageCount,setPageNumber} = useContext(ContactContext);
   
    const pageCounter = generateArr(pageCount);

// func
const handleCountClick = (evt) => 
{
    setPageNumber(+evt.target.dataset.count)
}

    return(
        <>
           <h2 className="text-center">All Contacts</h2>
         { loaded ? (
            <> 
                { contacts.map((contact) => (
                    <Contact key={contact.id} contact={contact}/>
                ))
                }
                {/* Here i will show pagination */}
                <Pagination style={{'justifyContent' : 'center', 'marginTop' : '10px'}}>
                    {
                       pageCounter.map((count, index) => 
                        {
                        return(
                        <Pagination.Item 
                         key={index} 
                         active={count === pageNumber}
                         data-count={count}
                         onClick={handleCountClick}
                         > 
                           {count}
                         </Pagination.Item>
                         )
                        })
                    }
                </Pagination>
            </>
         ) : 
         (<Loader />) 
         }
       </>
    );
}

export default Contacts; 

