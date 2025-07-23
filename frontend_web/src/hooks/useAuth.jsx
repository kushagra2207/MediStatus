import { useState, useEffect } from "react";

export default function useAuth() {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    })

    // useEffect(() => {
        
    // }, [])

    return { user, setUser }    
}