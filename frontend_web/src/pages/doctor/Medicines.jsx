import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getMedicinesByHospital } from "../../api/medicine"
import { toast } from "react-toastify"

const DoctorMedicines = () => {
    const { user } = useAuth()

    const [medicines, setMedicines] = useState(null)

    useEffect(() => {
        const getMedicines = async () => {
            const res = await getMedicinesByHospital(user.hospital)
            if (res.status === 200) {
                setMedicines(res.data)
            }
            else {
                toast.error(`${res.data.msg}`)
            }
        }
        getMedicines()
    }, [])

    if (!medicines) return <div>Loading Medicines Page...</div>

    return (
        <div>
            {medicines.map((medicine) => (
                <div key={medicine._id} className="flex gap-4 border">
                    <h3>{medicine.name}</h3>
                    <p>{medicine.quantity}</p>
                </div>
            ))}
        </div>
    )
}

export default DoctorMedicines