import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getMedicinesByHospital } from "../../api/medicine"
import { toast } from "react-toastify"
import { FaPills } from "react-icons/fa"

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
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-900">Medicine Inventory</h1>
                    <p className="text-sm sm:text-base text-gray-600">View available medicines in your hospital</p>
                </div>

                {medicines.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-blue-100">
                        <div className="text-center">
                            <FaPills className="text-gray-400 text-6xl mx-auto mb-4" />
                            <p className="text-xl text-gray-600">No medicines found</p>
                            <p className="text-gray-500 mt-2">The inventory is currently empty</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100">
                        <div className="space-y-4">
                            {medicines.map((medicine) => (
                                <div key={medicine._id} className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 sm:p-5 border border-blue-100 hover:shadow-md transition-all duration-200">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg sm:text-xl font-bold text-sky-900 break-words mb-1">{medicine.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">Available Quantity:</span>
                                            <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                {medicine.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorMedicines