import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ role }) => {
    const { user } = useAuth()
    if(!user || user.role !== role) {
        return <Navigate to="/" />
    }
    return <div>
        <Outlet />
    </div>
}

export default ProtectedRoute