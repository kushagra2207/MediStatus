import { useState, useEffect } from "react"
import DoctorSignup from "./DoctorSignup"
import AdminSignup from "./AdminSignup"
import { getAllHospitals } from "../../api/hospital"

const Signup = () => {
  const [signup, setSignup] = useState("doctor")
  const [hospitals, setHospitals] = useState([])

  useEffect(() => {
    const getHospitals = async () => {
      let res = await getAllHospitals()
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
    <div className="p-4 flex flex-col gap-10">
      <div className='flex justify-center gap-4'>
        <button className={`p-2 rounded-lg ${signup === "doctor" ? "bg-amber-400" : "bg-amber-200"}`} onClick={() => setSignup("doctor")}>
          Doctor
        </button>
        <button className={`p-2 rounded-lg ${signup === "admin" ? "bg-amber-400" : "bg-amber-200"}`} onClick={() => setSignup("admin")}>
          Admin
        </button>
      </div>
      <div>
        {signup === "doctor" ? <DoctorSignup hospitals={hospitals} /> : <AdminSignup hospitals={hospitals} />}
      </div>
    </div>
  )
}

export default Signup