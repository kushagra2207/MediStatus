import { useState } from "react"
import AdminLogin from "./AdminLogin"
import DoctorLogin from "./DoctorLogin"

const Login = () => {
  const [login, setLogin] = useState("doctor")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className='flex justify-center gap-3 sm:gap-4 mb-8'>
          <button 
            className={`flex-1 max-w-xs py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md ${
              login === "doctor" 
                ? "bg-sky-600 text-white shadow-lg" 
                : "bg-white text-sky-900 hover:bg-sky-50"
            }`} 
            onClick={() => setLogin("doctor")}
          >
            Doctor
          </button>
          <button 
            className={`flex-1 max-w-xs py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md ${
              login === "admin" 
                ? "bg-sky-600 text-white shadow-lg" 
                : "bg-white text-sky-900 hover:bg-sky-50"
            }`} 
            onClick={() => setLogin("admin")}
          >
            Admin
          </button>
        </div>
        <div>
          {login === "doctor" ? <DoctorLogin /> : <AdminLogin />}
        </div>
      </div>
    </div>
  )
}

export default Login