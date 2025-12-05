import { useState, useEffect } from "react"
import DoctorSignup from "./DoctorSignup"
import AdminSignup from "./AdminSignup"
import { getAllHospitals } from "../../api/hospital"
import { toast } from "react-toastify"

const Signup = () => {
  const [signup, setSignup] = useState("doctor")
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className='flex justify-center gap-3 sm:gap-4 mb-8'>
          <button 
            className={`flex-1 max-w-xs py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md ${
              signup === "doctor" 
                ? "bg-sky-600 text-white shadow-lg" 
                : "bg-white text-sky-900 hover:bg-sky-50"
            }`} 
            onClick={() => setSignup("doctor")}
          >
            Doctor
          </button>
          <button 
            className={`flex-1 max-w-xs py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md ${
              signup === "admin" 
                ? "bg-sky-600 text-white shadow-lg" 
                : "bg-white text-sky-900 hover:bg-sky-50"
            }`} 
            onClick={() => setSignup("admin")}
          >
            Admin
          </button>
        </div>
        <div>
          {signup === "doctor" ? <DoctorSignup hospitals={hospitals} /> : <AdminSignup hospitals={hospitals} />}
        </div>
      </div>
    </div>
  )
}

export default Signup