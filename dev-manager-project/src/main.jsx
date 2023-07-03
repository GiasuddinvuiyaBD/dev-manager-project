import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routers/App';


import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.min.css';
import {BrowserRouter} from 'react-router-dom';
import {ProvideContext} from './context/Contact.context';
import {AuthProvider} from './context/Auth.context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProvideContext>
          <App />
        </ProvideContext>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
