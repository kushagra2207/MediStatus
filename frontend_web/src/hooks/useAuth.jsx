import { useState, useEffect, useContext, createContext } from "react";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

const isTokenExpired = (decoded) => {
    if (!decoded?.exp) return true;
    return decoded.exp * 1000 < Date.now();
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token")

        if (!token) return null

        try {
            const decoded = jwtDecode(token)
            if (isTokenExpired(decoded)) {
                localStorage.removeItem("token")
                return null
            }
            return decoded
        }
        catch (err) {
            return null
        }
    })

    useEffect(() => {
        const handleStorage = () => {
            const token = localStorage.getItem("token")
            if (!token) {
                setUser(null)
            }
            else {
                try {
                    const decoded = jwtDecode(token)
                    if (isTokenExpired(decoded)) {
                        localStorage.removeItem("token")
                        setUser(null)
                    }
                    else setUser(decoded)
                }
                catch {
                    setUser(null)
                }
            }
        }

        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)