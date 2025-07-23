import { useState } from "react"
import DoctorSignup from "../../components/DoctorSignup"
import AdminSignup from "../../components/AdminSignup"

const Signup = () => {
  const [signup, setSignup] = useState("doctor")

  return (
    <div className="p-4 flex flex-col gap-10">
      <div className='flex justify-center gap-4'>
        <button className={`p-2 rounded-lg ${signup === "doctor" ? "bg-amber-400": "bg-amber-200"}`} onClick={() => setSignup("doctor")}>
          Doctor
        </button>
        <button className={`p-2 rounded-lg ${signup === "admin" ? "bg-amber-400": "bg-amber-200"}`} onClick={() => setSignup("admin")}>
          Admin
        </button>
      </div>
      <div>
        {signup === "doctor" ? <DoctorSignup /> : <AdminSignup />}
      </div>
    </div>
  )
}

export default Signup