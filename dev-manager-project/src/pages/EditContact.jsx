import ContactFrom from "../component/contacts/ContactFrom";
import { useParams } from "react-router-dom";

const EditContact = ({contacts,updateContact}) => 
{
    const {id} = useParams();
    const foundContact = contacts.find((contact) => contact.id === id)
    return <ContactFrom contact={foundContact} />
}

export default EditContact;


