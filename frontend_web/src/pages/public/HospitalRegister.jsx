import { useState } from "react"
import { addHospital } from '../../api/hospital'
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'
import { FaHospital, FaMapMarkerAlt, FaPhone, FaArrowLeft } from "react-icons/fa"

const HospitalRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRegister = async () => {
        const res = await addHospital(formData)
        if (res.status === 201) {
            toast.success(`${res.data.msg}`)
        }
        else {
            toast.error(`${res.data.msg}`)
        }
        setFormData({
            name: '',
            address: '',
            contact: ''
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                <Link
                    className="inline-flex items-center gap-2 text-sky-700 hover:text-sky-900 font-medium mb-6 transition-colors duration-200"
                    to="/hospitals"
                >
                    <FaArrowLeft />
                    Back to Hospitals
                </Link>

                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-blue-100">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-sky-900 mb-2">Register Hospital</h1>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-sky-900 mb-2">
                                Hospital Name
                            </label>
                            <div className="relative">
                                <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    className="w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Hospital Name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-sky-900 mb-2">
                                Address
                            </label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                                <textarea
                                    className="w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200 resize-none"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter Address"
                                    rows="3"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-sky-900 mb-2">
                                Contact Number
                            </label>
                            <div className="relative">
                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    className="w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200"
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="Enter Contact Number"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                            onClick={handleRegister}
                        >
                            Register Hospital
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalRegister