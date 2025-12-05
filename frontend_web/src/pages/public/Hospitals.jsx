import { useState, useEffect } from "react"
import { getAllHospitals } from "../../api/hospital"
import { IoIosSearch } from "react-icons/io"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { FaHospital, FaMapMarkerAlt, FaPhone } from "react-icons/fa"

const Hospitals = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [hospitals, setHospitals] = useState([])

    useEffect(() => {
        const getHospitals = async () => {
            const res = await getAllHospitals()
            if (res.status === 200) {
                setHospitals(res.data)
            }
            else {
                toast.error(`${res.data.msg}`)
            }
        }
        getHospitals()
    }, [])

    const filteredHospitals = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sky-900">Hospitals</h1>
                    <Link
                        className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg px-6 py-2.5 font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                        to="/hospitalRegister"
                    >
                        Register Hospital
                    </Link>
                </div>

                <div className="relative w-full mb-6">
                    <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
                    <input
                        className="bg-white w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm"
                        type="text"
                        placeholder="Search by hospital name or address..."
                        name="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    {filteredHospitals.length > 0 ? (
                        filteredHospitals.map(hospital => (
                            <div key={hospital._id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
                                <div className="flex items-start gap-4">
                                    <div className="bg-sky-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaHospital className="text-white text-2xl" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl sm:text-2xl font-bold text-sky-900 mb-3">{hospital.name}</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <FaMapMarkerAlt className="text-sky-600 mt-1 flex-shrink-0" />
                                                <p className="text-gray-700 break-words">{hospital.address}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaPhone className="text-sky-600 flex-shrink-0" />
                                                <p className="text-gray-700">{hospital.contact}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <FaHospital className="text-gray-400 text-6xl mx-auto mb-4" />
                            <p className="text-xl text-gray-600">No Hospitals Found</p>
                            <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Hospitals