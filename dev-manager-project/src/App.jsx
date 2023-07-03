import { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '.././index.css';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import {Routes,Route} from 'react-router-dom'; 
import { ref } from 'yup';

import Header from '.././layout/Header';
import AddContact from '.././pages/AddContact';
import Home from '../../src/pages/Home';
import Contacts from '.././pages/Contacts';
import Registar from '../../src/pages/Registar';
import Login from '../../src/pages/Login';
import ContactDetails from '../../src/pages/ContactDetails';
import NotFound from '../../src/pages/NotFound';
import EditContact from '../../src/pages/EditContact';
import Dashbord from '.././pages/Dashbord';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Profile from '../pages/Profile';
import UserContactList from '../pages/UserContactList';
import ManagePassword from '../pages/ManagePassword';
import { ContactContext } from '.././context/Contact.context'; 
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';


function App() {

  // here i am using context 
  // this is contacts come from Counter.context.jsx component
  const {contacts,setContacts} = useContext(ContactContext); 
  
  return (
    <div className="App">  
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        
          <Header />
          <Container  style={{width:'1000px', margin : '0 auto'}} className='pt-3'>
            
          <Routes>           
            <Route path='/' index element={<Home />}/> 
            <Route path="/home" element={<Home />} />
           
            <Route path='/add-contact' 
            element={
              <PrivateRoute> 
                    <AddContact/> 
              </PrivateRoute> 
              } 
            />

            <Route path='/contacts' element={
              <PrivateRoute> 
                  <Contacts contacts={contacts} />
              </PrivateRoute> 
            } /> 

            <Route path='dashbord'element={
            <PrivateRoute>
              <Dashbord />
            </PrivateRoute>
           }
            >
              <Route index element={<Profile />} />
              <Route path='profile' element={<Profile />} />
              <Route path='manage-password' element={<ManagePassword />} />
              <Route path='contacts' element={<UserContactList />} />
            </Route>
           
         
           <Route path='/forgot-password' element={<ForgotPassword />} />
           <Route path='/reset-password' element={<ResetPassword />} />
          
           {/* public route start here  */}
            <Route path='/register' element={
              <PublicRoute>
                <Registar />
              </PublicRoute>
            }
            />
            <Route path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>  
            }
            />
           {/* public route end here  */}

            <Route path='/editContact/:id' 
              element={
              <PrivateRoute>
                 <EditContact contacts={contacts}/>
              </PrivateRoute>
             }
            />
              
            <Route path='/contacts/:id' 
              element={
              <PrivateRoute>
                <ContactDetails contacts={contacts} />
              </PrivateRoute>
            }
            />
            <Route path='*' element={<NotFound/>} />
          </Routes>

          </Container>
    </div>
  );
}

export default App
