import { useContext } from "react";
import { Link } from "react-router-dom";
import {Button, Table} from "react-bootstrap"
import { AuthContext } from "../context/Auth.context";
import {ContactContext} from "../context/Contact.context"

const UserContactList = () => 
{
    const {userContacts, loaded, setTriggerDelete} = useContext(AuthContext); 
    const {deleteContact} = useContext(ContactContext);


  const handleDelete = (id) => 
  {
    deleteContact(id); 
    setTriggerDelete(true);
  }

   const handleEdit = (evt) => 
   {
      console.log('handleEdit button clicked')
   }

    return (
        loaded && (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Profession</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {
           userContacts && userContacts.map((contacat) => 
            {
                return(
                 <tr key={contacat.id}>
                    <td>{contacat.id}</td>
                    <td>{contacat.firstName}</td>
                    <td>{contacat.lastName}</td>
                    <td>{contacat.email}</td>
                    <td>{contacat.profession}</td>
                    <td>
                      <Button variant="danger" 
                      onClick={() => handleDelete(contacat.id)}
                      > 
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Button variant="secondary"
                      as={Link}
                      to={`/editContact/${contacat.id}`}
                      onClick={handleEdit}
                      > 
                        Edit
                      </Button>
                    </td>
                  </tr>
                )
            })
          }
          </tbody>
        </Table>
        )
      );
}
export default UserContactList;
