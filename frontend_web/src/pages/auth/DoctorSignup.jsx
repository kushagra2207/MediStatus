import { useState } from "react"
import { doctorSignup } from "../../api/doctor"
import { toast } from "react-toastify"
import { useAuth } from "../../hooks/useAuth"
import { jwtDecode } from "jwt-decode"

const DoctorSignup = ({ hospitals }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    password: '',
    hospital: ''
  })

  const { setUser } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onRegister = async (data) => {
    const res = await doctorSignup(data)
    if (res.status === 201) {
      setFormData({
        name: '',
        specialization: '',
        email: '',
        password: '',
        hospital: ''
      })
      const { token } = res.data
      localStorage.setItem("token", token)
      const decoded = jwtDecode(token)
      setUser(decoded)
    }
    else {
      toast.error(`${res.data.msg}`)
    }
  }

  return (
    <div>
      <div className='text-center'>Doctor Signup</div>
      <div className='flex flex-col gap-4'>
        <input
          className='outline'
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='Enter Name' />
        <input
          className='outline'
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder='Enter Specialization' />
        <input
          className='outline'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter Email' />
        <input
          className='outline'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder='Enter Password' />
        <select
          className='outline'
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
        >
          <option value="" disabled>Select Hospital</option>
          {hospitals.map(h => (
            <option key={h._id} value={h._id}>
              {h.name} ({h.address})
            </option>
          ))}
        </select>
      </div>
      <div className="text-center my-4">
        <button
          className="bg-amber-200 cursor-pointer"
          onClick={() => onRegister(formData)}
        >
          Signup
        </button>
      </div>
    </div>
  )
}

export default DoctorSignup