import { useState } from "react"
import { doctorSignup } from "../../api/doctor"
import { toast } from "react-toastify"

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    password: '',
    hospital: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onRegister = async (data) => {
    let res = await doctorSignup(data)
    setFormData({
      name: '',
      specialization: '',
      email: '',
      password: '',
      hospital: ''
    })
    if (res.status === 201) {
      const { token } = res.data
      localStorage.setItem("token", token)
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
        <input
          className='outline'
          type="text"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          placeholder='Enter Hospital' />
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