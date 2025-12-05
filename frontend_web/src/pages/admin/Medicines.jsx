import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import {
    getMedicinesByHospital,
    addMedicine,
    updateMedicine,
    deleteMedicine
} from "../../api/medicine"
import { toast } from "react-toastify"
import { FaPills, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa"

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

    if (!medicines) return (
        <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600 mx-auto mb-4"></div>
                <p className="text-xl text-sky-900 font-semibold">Loading Medicines...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-900 mb-6">Medicine Inventory</h1>

                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100 mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
                        <FaPlus className="text-sky-600" />
                        Add New Medicine
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-semibold text-sky-900 mb-2">Medicine Name</label>
                            <input
                                className="w-full p-4 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200"
                                type="text"
                                name="name"
                                value={newMedicine.name}
                                onChange={handleChangeAdd}
                                placeholder="Enter Medicine Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-sky-900 mb-2">Quantity</label>
                            <input
                                className="w-full p-4 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200"
                                type="number"
                                name="quantity"
                                value={newMedicine.quantity}
                                onChange={handleChangeAdd}
                                placeholder="Enter Quantity"
                            />
                        </div>
                    </div>
                    <button
                        className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                        onClick={addNewMedicine}
                    >
                        <FaPlus />
                        Add Medicine
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100">
                    <h2 className="text-lg sm:text-xl font-bold text-sky-900 mb-6">All Medicines</h2>
                    {medicines.length === 0 ? (
                        <div className="text-center py-12">
                            <FaPills className="text-gray-400 text-6xl mx-auto mb-4" />
                            <p className="text-xl text-gray-600">No medicines found</p>
                            <p className="text-gray-500 mt-2">Add your first medicine above</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {medicines.map((medicine) => (
                                <div key={medicine._id} className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 sm:p-5 border border-blue-100 hover:shadow-md transition-all duration-200">
                                    {editMedicine?.id === medicine._id ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-sky-900 mb-2">Medicine Name</label>
                                                    <input
                                                        className="w-full p-3 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200"
                                                        type="text"
                                                        name="name"
                                                        value={editMedicine.name}
                                                        onChange={handleChangeEdit}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-sky-900 mb-2">Quantity</label>
                                                    <input
                                                        className="w-full p-3 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200"
                                                        type="number"
                                                        name="quantity"
                                                        value={editMedicine.quantity}
                                                        onChange={handleChangeEdit}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <button
                                                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                                                    onClick={() => handleUpdateMedicine(medicine._id)}
                                                >
                                                    <FaSave />
                                                    Save
                                                </button>
                                                <button
                                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                                                    onClick={() => setEditMedicine(null)}
                                                >
                                                    <FaTimes />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4 flex-1 min-w-0">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg sm:text-xl font-bold text-sky-900 break-words">{medicine.name}</h3>
                                                    <p className="text-gray-600 mt-1">
                                                        <span className="font-semibold">Quantity:</span> {medicine.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 sm:flex-shrink-0">
                                                <button
                                                    className="flex-1 sm:flex-none bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                                                    onClick={() => setEditMedicine({
                                                        id: medicine._id,
                                                        name: medicine.name,
                                                        quantity: medicine.quantity
                                                    })}
                                                >
                                                    <FaEdit />
                                                    Edit
                                                </button>
                                                <button
                                                    className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                                                    onClick={() => handleDeleteMedicine(medicine._id)}
                                                >
                                                    <FaTrash />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminMedicines