import { v4 as uuidv4 } from 'uuid';

// my importing
import {DELETE_CONTACTS,ADD_CONTACT,UPDATE_CONTACT,LOAD_CONTACTS} from './type';
  // here i will use reducer function 
  const contactsReducer = (state,action) => 
  {
      const {type,payload} = action;

      // i will check the condition by using switch method. 
      switch(type)
      {
        case LOAD_CONTACTS : 
        return [...action.payload];

        case DELETE_CONTACTS : 
        let updateData = state.filter((contact) => contact.id !== payload)
        return [...updateData];
  
        case ADD_CONTACT : 
        let newContact = 
        {
          id : uuidv4(),
          ...payload,
        } 
        return[newContact, ...state];
  
        case UPDATE_CONTACT : 
          const {updatedData,id} = payload;
          const contacts = state.map((contact) => 
          {
              if(contact.id === id)
              {
                return {
                  id,
                  ...updatedData
                }
              }else{
                return contact
              }
          }); 
          return [...contacts]
          default : state 
      }
  
  }
export default contactsReducer;