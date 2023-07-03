import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink,Link, useNavigate} from 'react-router-dom'; 
import Dashbord from '../pages/Dashbord';

import {AuthContext} from '../context/Auth.context'


function Header({setSearchInput})
{
  // i have recieved logout from
  const {logout,user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = (evt) => 
  {
    evt.preventDefault();
    // console.log(text)
    setSearchInput(text)
    // navigate to search component
    setText('')
    navigate('/search');
  }

    return(
        <Navbar bg="light" expand="lg">
        <Container >
          <Navbar.Brand as={Link} index path='/' className='brand'>Dev Manager</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to='home'>Home</Nav.Link>
              {user && 
                <>
                  <Nav.Link as={NavLink} to='add-contact'>Add-Contact</Nav.Link>
                  <Nav.Link as={NavLink} to='/dashbord/profile'>Dashbord</Nav.Link>
                  <Nav.Link as={NavLink} to='contacts'>Contacts</Nav.Link>
                  <Nav.Link onClick={logout} >Logout </Nav.Link>
                </>
              }

             {!user &&
                <>
                  <Nav.Link as={NavLink} to='register'>Register</Nav.Link>
                  <Nav.Link as={NavLink} to='login'>Login </Nav.Link>
                </>
             }
            </Nav>
            {user &&(
            <Form className="d-flex" onClick={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                value={text}
                aria-label="Search"
                onChange={(evt) => setText(evt.target.value) }
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header;