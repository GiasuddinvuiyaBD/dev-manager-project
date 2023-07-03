import {useState,useEffect,useContext} from 'react'
import { useParams,useNavigate,Link} from "react-router-dom";
import {Card,Button,ListGroup} from 'react-bootstrap';
import {FaPencilAlt,FaRegTrashAlt,FaTrash} from 'react-icons/fa'
import {toast} from 'react-toastify';
import { ContactContext } from '../context/Contact.context';


const ContactDetails = ({contacts}) => 
{
    const [contact,setContact] = useState({}); 
    const {deleteContact} = useContext(ContactContext)
    const navigate = useNavigate();
    const {id} = useParams(); 


    // finding selected contact
    const foundContact = contacts.find((contact) => contact.id === +id);
    useEffect(() => 
    {
        if(id && foundContact)
        {
            setContact(foundContact)
        }
    },[id]);

    // here i have deleting our details information
    const handleDelete = (id) => 
    { 
        deleteContact(id); 
    }

    const {firstName,lastName,email,image,bio,dateOfBirth,profession,gender} = contact;

    return(
        <>
        <h2 className='text-center mb-3'>Contacts Details</h2>
         {Object.keys(contact).length === 0 ? (
            <h2>No contact to show</h2>
         ) : (
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
            
                <Card.Link as={Link} to={`/edit-contact/${id}`}>
                <Button  variant="warning">
                    <FaPencilAlt />
                </Button>
                <Button  variant="danger" className='mt-l' onClick={() => handleDelete(id)}>
                    <FaTrash />
                </Button>
                </Card.Link>
            </Card.Body>
            </div>
        </Card>
         )}
        </>
    );
}

export default ContactDetails