import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RedirectIfAuthenticated = ({ children }) => {
    const { user } = useAuth()

    if (user) {
        if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />
        if (user.role === "doctor") return <Navigate to="/doctor/dashboard" replace />
    }

    return children
}

export default RedirectIfAuthenticated