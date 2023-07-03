import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FaEye,FaTrash } from "react-icons/fa";
import {toast} from 'react-toastify'; 
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContactContext } from '../../context/Contact.context';


function Contact({contact})
{
  // deleting start here
  const {deleteContact} = useContext(ContactContext);
  
    // getting result
    const {id,firstName,lastName,email,profession,gender,image,dateOfBirth,bio} = contact;
    const handleDelete = (id) => 
    { 
      toast.error('Contact is deleted successfully')
      deleteContact(id)
    }

    return(
      <Card className='mg-3'>
      <div className='d-flex'>
      <Card.Img className="card-img" src={image} />
      <Card.Body>
        <Card.Title>{firstName} {lastName}</Card.Title>
        <Card.Subtitle className='mt-10'>{profession}</Card.Subtitle>
        <Card.Text>
          {bio}
        </Card.Text>
     
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Gender : {gender}</ListGroup.Item>
        <ListGroup.Item>Email Address : {email}</ListGroup.Item>
        <ListGroup.Item>Date Of Birth : {dateOfBirth}</ListGroup.Item>
      </ListGroup>
    
        <Card.Link href="#" as={Link} to={`/contacts/${id}`}>
          <Button  variant="warning">
            <FaEye />
          </Button>
            <Button  variant="danger" className='mt-l' onClick={() => handleDelete(id)}>
            <FaTrash />
          </Button>
        </Card.Link>
      </Card.Body>
      </div>
    </Card>
    )
}

export default Contact

