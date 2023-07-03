
import { useContext } from "react";
import { Navigate,useLocation } from "react-router-dom";
import { AuthContext} from "../context/Auth.context";



const PublicRoute = ({children}) => 
{
    const {user} = useContext(AuthContext);
    const location = useLocation(); 
    // loaded Component
    const loadeComp = user ? (
        <Navigate 
             to={location?.state?.from ? location?.state?.from : '/contacts' } 
        />
        ) :  (
        children
    );
   
    return(
        <>
            <div>{loadeComp}</div>
        </>
    )
}
export default PublicRoute;