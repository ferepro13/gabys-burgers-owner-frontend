import {Navigate} from "react-router-dom"
import { useAuth } from '../../hooks/useAuth'

const PrivateRoute = ({children}) => {

    const {user, isAuthenticated, loading} = useAuth();

    if (loading) {
        return <div>Cargando...</div>; // o un spinner o empty state
    }

    return (
        (user && isAuthenticated) ? children : <Navigate to={"/login"} replace/>
    )
}

export default PrivateRoute