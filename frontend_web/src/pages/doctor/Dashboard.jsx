import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getDoctorById } from "../../api/doctor"
import { toast } from "react-toastify"

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

  if(!doctor) return <div>Loading Dashboard...</div>
  
  return (
    <div>
      <h2>Welocme, {doctor.name}</h2>
      <p>{doctor.specialization}</p>
      <p>{doctor.hospital.name}</p>
    </div>
  )
}

export default DoctorDashboard