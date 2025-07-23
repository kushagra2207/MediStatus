import { useState } from "react"

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    hospitalName: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div>
      <div className='text-center'>Admin Signup</div>
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
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder='Enter Email' />
        <input 
        className='outline' 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        type="password" 
        placeholder='Enter Password' />
        <input 
        className='outline' 
        type="text" 
        name="hospitalName" 
        value={formData.hospitalName} 
        onChange={handleChange} 
        placeholder='Enter Hospital Name' />
      </div>
      <div className="text-center my-4">
        <button 
        className="bg-amber-200">
          Signup
        </button>
      </div>
    </div>
  )
}

export default AdminSignup