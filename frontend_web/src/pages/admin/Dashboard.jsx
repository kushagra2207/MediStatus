import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getAdminById } from "../../api/admin"
import { toast } from "react-toastify"

const AdminDashboard = () => {
    const { user } = useAuth()

    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        const getAdmin = async () => {
            const res = await getAdminById(user.id)
            if (res.status === 200) {
                setAdmin(res.data)
            }
            else {
                toast.error(`${res.data.msg}`)
            }
        }
        getAdmin()
    }, [])

    if (!admin) return <div>Loading Dashboard...</div>

    return (
        <div>
            <h2>Welcome, {admin.name}</h2>
            <span>{admin.hospital.name}</span>
        </div>
    )
}

export default AdminDashboard