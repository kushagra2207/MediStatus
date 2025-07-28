import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode"

export default function useAuth() {
    const [user, setUser] = useState(() => {
        const token = sessionStorage.getItem("token")

        if(!token) return null

        try {
            const decoded = jwtDecode(token)
            return decoded
        }
        catch(err) {
            return null
        }
    })

    useEffect(() => {
        const handleStorage = () => {
            const token = sessionStorage.getItem("token")
            if(!token) {
                setUser(null)
            }
            else {
                try {
                    setUser(jwtDecode(token))
                }
                catch {
                    setUser(null)
                }
            }
        }

        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])

    return { user, setUser }    
}