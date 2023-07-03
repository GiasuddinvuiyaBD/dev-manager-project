import { useContext } from "react";
import { Navigate,useLocation } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";


const PrivateRoute = ({children}) => 
{
    const {user} = useContext(AuthContext);
    const location = useLocation(); 
    // loaded Component
    const loadeComp = user ? (
        children
        ) :  (
     // it didn't give me path name which i searching. on the url
    <Navigate to='/login'  state={{from : location.pathname}} />
    );
    return(
        <>
            <div>{loadeComp}</div>
        </>
    );
}
export default PrivateRoute;
