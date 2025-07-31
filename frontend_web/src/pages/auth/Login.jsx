import { useState } from "react"
import AdminLogin from "./AdminLogin"
import DoctorLogin from "./DoctorLogin"

const Login = () => {
  const [login, setLogin] = useState("doctor")

  return (
    <div className="p-4 flex flex-col gap-10">
      <div className='flex justify-center gap-4'>
        <button className={`p-2 rounded-lg ${login === "doctor" ? "bg-amber-400": "bg-amber-200"}`} onClick={() => setLogin("doctor")}>
          Doctor
        </button>
        <button className={`p-2 rounded-lg ${login === "admin" ? "bg-amber-400": "bg-amber-200"}`} onClick={() => setLogin("admin")}>
          Admin
        </button>
      </div>
      <div>
        {login === "doctor" ? <DoctorLogin /> : <AdminLogin />}
      </div>
    </div>
  )
}

export default Login