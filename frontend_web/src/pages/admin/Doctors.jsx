import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getDoctorByHospital } from "../../api/doctor"
import { toast } from "react-toastify"

const Doctors = () => {
  const { user } = useAuth()

  const [doctors, setDoctors] = useState(null)

  useEffect(() => {
    const getDoctors = async () => {
      const res = await getDoctorByHospital(user.hospital)
      if(res.status === 200) {
        setDoctors(res.data)
      }
      else {
        toast.error(`${res.data.msg}`)
      }
    }
    getDoctors()
  }, [])
  

  if (!doctors) return <div>Loading Doctors Page...</div>

  return (
    <div>
      {doctors.map((doc) => (
        <div key={doc._id} className="border">
          <h3>{doc.name}</h3>
          <p>{doc.specialization}</p>
        </div>
      ))}
    </div>
  )
}

export default Doctors