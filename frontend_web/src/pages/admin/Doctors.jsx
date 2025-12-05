import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getDoctorByHospital } from "../../api/doctor"
import { toast } from "react-toastify"
import { FaUserMd, FaStethoscope, FaEnvelope } from "react-icons/fa"

const Doctors = () => {
  const { user } = useAuth()

  const [doctors, setDoctors] = useState(null)

  useEffect(() => {
    const getDoctors = async () => {
      const res = await getDoctorByHospital(user.hospital)
      if (res.status === 200) {
        setDoctors(res.data)
      }
      else {
        toast.error(`${res.data.msg}`)
      }
    }
    getDoctors()
  }, [])

  if (!doctors) return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600 mx-auto mb-4"></div>
        <p className="text-xl text-sky-900 font-semibold">Loading Doctors...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-900">Doctors</h1>
          <p className="text-sm sm:text-base text-gray-600">View all doctors in your hospital</p>
        </div>

        {doctors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-blue-100">
            <div className="text-center">
              <FaUserMd className="text-gray-400 text-6xl mx-auto mb-4" />
              <p className="text-xl text-gray-600">No doctors found</p>
              <p className="text-gray-500 mt-2">No doctors are registered in your hospital yet</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {doctors.map((doc) => (
              <div key={doc._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-blue-100 group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-sky-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <FaUserMd className="text-white text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-sky-900 break-words">
                      Dr. {doc.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <FaStethoscope className="text-sky-600 text-lg mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 mb-1">Specialization</p>
                      <p className="text-sm sm:text-base font-semibold text-sky-900 break-words">{doc.specialization}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <FaEnvelope className="text-sky-600 text-lg mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 mb-1">Email</p>
                      <p className="text-sm sm:text-base font-semibold text-sky-900 break-all">{doc.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctors