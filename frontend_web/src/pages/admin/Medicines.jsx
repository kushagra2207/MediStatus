import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import {
    getMedicinesByHospital,
    addMedicine,
    updateMedicine,
    deleteMedicine
} from "../../api/medicine"
import { toast } from "react-toastify"

const AdminMedicines = () => {
    const { user } = useAuth()

    const [medicines, setMedicines] = useState(null)
    const [editMedicine, setEditMedicine] = useState(null)
    const [newMedicine, setNewMedicine] = useState({
        name: '',
        quantity: '',
        hospital: user.hospital
    })

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

    const handleChangeAdd = (e) => {
        const { name, value } = e.target
        setNewMedicine((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeEdit = (e) => {
        const { name, value } = e.target
        setEditMedicine((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const addNewMedicine = async () => {
        const medicineToSend = {
            ...newMedicine,
            quantity: Number(newMedicine.quantity)
        }

        const res = await addMedicine(medicineToSend)
        if (res.status === 201) {
            setNewMedicine({
                name: '',
                quantity: '',
                hospital: user.hospital
            })
            toast.success(`${res.data.msg}`)
            setMedicines((prev) => [...prev, res.data.medicine])
        }
        else {
            toast.error(`${res.data.msg}`)
        }
    }

    const handleUpdateMedicine = async (id) => {
        const updated = {
            name: editMedicine.name,
            quantity: Number(editMedicine.quantity)
        }

        const res = await updateMedicine(id, updated)
        if (res.status === 200) {
            setMedicines(
                (prev) => prev.map((med) => (med._id === id ? { ...med, ...updated} : med))
            )
            setEditMedicine(null)
            toast.success(`${res.data.msg}`)
        }
        else {
            toast.error(`${res.data.msg}`)
        }
    }

    const handleDeleteMedicine = async (id) => {
        const res = await deleteMedicine(id)
        if (res.status === 200) {
            setMedicines((prev) => prev.filter((med) => med._id !== id))
            toast.success(`${res.data.msg}`)
        }
        else {
            toast.error(`${res.data.msg}`)
        }
    }

    if (!medicines) return <div>Loading Medicines Page...</div>

    return (
        <div>
            <div>
                <input
                    className="outline"
                    type="text"
                    name="name"
                    value={newMedicine.name}
                    onChange={handleChangeAdd}
                    placeholder="Enter Name"
                />
                <input
                    className="outline"
                    type="number"
                    name="quantity"
                    value={newMedicine.quantity}
                    onChange={handleChangeAdd}
                    placeholder="Enter Quantity"
                />
            </div>
            <button
                className="cursor-pointer"
                onClick={addNewMedicine}
            >
                ADD A NEW MEDICINE
            </button>
            <div>
                {medicines.map((medicine) => (
                    <div key={medicine._id} className="border">
                        {editMedicine?.id === medicine._id ? (
                            <>
                                <input
                                    className="outline"
                                    type="text"
                                    name="name"
                                    value={editMedicine.name}
                                    onChange={handleChangeEdit}
                                />
                                <input
                                    className="outline"
                                    type="number"
                                    name="quantity"
                                    value={editMedicine.quantity}
                                    onChange={handleChangeEdit}
                                />
                                <button
                                    className="cursor-pointer"
                                    onClick={() => handleUpdateMedicine(medicine._id)}
                                >
                                    Save
                                </button>
                                <button
                                    className="cursor-pointer"
                                    onClick={() => setEditMedicine(null)}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h3>{medicine.name}</h3>
                                <p>{medicine.quantity}</p>
                                <button
                                    className="cursor-pointer"
                                    onClick={() => setEditMedicine({
                                        id: medicine._id,
                                        name: medicine.name,
                                        quantity: medicine.quantity
                                    })}
                                >
                                    Edit
                                </button>
                                <button
                                    className="cursor-pointer"
                                    onClick={() => handleDeleteMedicine(medicine._id)}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminMedicines