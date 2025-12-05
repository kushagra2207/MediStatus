import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getDoctorById } from "../../api/doctor"
import { toast } from "react-toastify"
import { FaUserMd, FaHospital, FaMapMarkerAlt, FaPhone, FaStethoscope, FaPills, FaClock } from "react-icons/fa"
import { Link } from "react-router-dom"

const DoctorDashboard = () => {
  const { user } = useAuth()

  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    const getDoctor = async () => {
      const res = await getDoctorById(user.id)
      if(res.status === 200) {
        setDoctor(res.data)
      }
      else {
        toast.error(`${res.data.msg}`)
      }
    }
    getDoctor()
  }, [])

  if(!doctor) return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600 mx-auto mb-4"></div>
            <p className="text-xl text-sky-900 font-semibold">Loading Dashboard...</p>
        </div>
    </div>
  )
  
  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="bg-sky-600 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <FaUserMd className="text-white text-2xl sm:text-3xl lg:text-4xl" />
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-sky-900 mb-1 break-words">
                            Welcome, Dr. {doctor.name}
                        </h1>
                        <div className="flex items-center gap-2 flex-wrap">
                            <FaStethoscope className="text-sky-600 flex-shrink-0" />
                            <p className="text-sky-600 font-semibold text-sm sm:text-base break-words">{doctor.specialization}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 flex-1 min-h-0">
                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100 flex flex-col overflow-auto">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Hospital Information</h2>
                    <div className="space-y-3 sm:space-y-4 flex-1 overflow-auto">
                        <div className="flex items-start gap-3 p-3 sm:p-4 bg-blue-50 rounded-xl">
                            <FaHospital className="text-sky-600 text-lg sm:text-xl mt-1 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm text-gray-600 mb-1">Hospital Name</p>
                                <p className="text-sm sm:text-base lg:text-lg font-semibold text-sky-900 break-words">{doctor.hospital.name}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 sm:p-4 bg-blue-50 rounded-xl">
                            <FaMapMarkerAlt className="text-sky-600 text-lg sm:text-xl mt-1 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm text-gray-600 mb-1">Address</p>
                                <p className="text-sm sm:text-base lg:text-lg font-semibold text-sky-900 break-words">{doctor.hospital.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 sm:p-4 bg-blue-50 rounded-xl">
                            <FaPhone className="text-sky-600 text-lg sm:text-xl mt-1 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm text-gray-600 mb-1">Contact</p>
                                <p className="text-sm sm:text-base lg:text-lg font-semibold text-sky-900 break-words">{doctor.hospital.contact}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100 flex flex-col overflow-auto">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-sky-900 mb-4 sm:mb-6">Quick Actions</h2>
                    <div className="space-y-3 sm:space-y-4 flex-1 overflow-auto">
                        <Link
                            to="/doctor/medicines"
                            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-200 border border-blue-100 group"
                        >
                            <div className="bg-sky-600 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                                <FaPills className="text-white text-lg sm:text-xl" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-sky-900 text-sm sm:text-base lg:text-lg">View Medicines</h3>
                                <p className="text-xs sm:text-sm text-gray-600">Check hospital inventory</p>
                            </div>
                        </Link>

                        <Link
                            to="/doctor/availability"
                            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-200 border border-blue-100 group"
                        >
                            <div className="bg-sky-600 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                                <FaClock className="text-white text-lg sm:text-xl" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-sky-900 text-sm sm:text-base lg:text-lg">Manage Availability</h3>
                                <p className="text-xs sm:text-sm text-gray-600">Update your schedule</p>
                            </div>
                        </Link>

                        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs sm:text-sm text-gray-600">Role</span>
                                <span className="bg-sky-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">DOCTOR</span>
                            </div>
                            <div className="flex items-start justify-between gap-2">
                                <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">Email</span>
                                <span className="text-xs sm:text-sm font-semibold text-sky-900 break-all text-right">{doctor.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DoctorDashboard