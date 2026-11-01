const BASE_URL = import.meta.env.VITE_API_BASE_URL

import { useState, useEffect, useContext, createContext } from "react";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

const isTokenExpired = (decoded) => {
    if (!decoded?.exp) return true;
    return decoded.exp * 1000 < Date.now();
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("accessToken")

        if (!token) return null

        try {
            const decoded = jwtDecode(token)
            if (isTokenExpired(decoded)) {
                localStorage.removeItem("accessToken")
                return null
            }
            return decoded
        }
        catch (err) {
            return null
        }
    })

    const [loading, setLoading] = useState(true)
    const [serverOnline, setServerOnline] = useState(true)

    useEffect(() => {
        const handleStorage = () => {
            const token = localStorage.getItem("accessToken")
            if (!token) {
                setUser(null)
            }
            else {
                try {
                    const decoded = jwtDecode(token)
                    if (isTokenExpired(decoded)) {
                        localStorage.removeItem("accessToken")
                        setUser(null)
                    }
                    else setUser(decoded)
                }
                catch {
                    setUser(null)
                }
            }
        }

        // Listen for cross-tab storage changes
        window.addEventListener("storage", handleStorage)

        // Listen for forced logout from fetchWrapper (refresh token failed)
        const handleAuthLogout = () => {
            setUser(null)
        }
        window.addEventListener("auth:logout", handleAuthLogout)

        const checkServer = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${BASE_URL}/health`, { method: "GET" })

                if (res.ok) {
                    setServerOnline(true)
                }
                else {
                    setServerOnline(false)
                }
            } catch (err) {
                setServerOnline(false)
            } finally {
                setLoading(false)
            }
        }

        checkServer()

        return () => {
            window.removeEventListener("storage", handleStorage)
            window.removeEventListener("auth:logout", handleAuthLogout)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, serverOnline }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
