import { useState } from "react"
import { doctorGetOtp, doctorVerifyOtp } from "../../api/doctor"
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

  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const { setUser } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter email first")
      return
    }

    const res = await doctorGetOtp({ email: formData.email })

    if (res.status === 200) {
      setOtpSent(true)
      toast.success(res.data.msg)
    } else {
      toast.error(res.data.msg)
    }
  }

  const onRegister = async () => {
    if (!otpSent) {
      toast.error("Please get OTP first")
      return
    }

    if (!otp.trim()) {
      toast.error("Please enter the OTP")
      return
    }

    if (!formData.name || !formData.specialization || !formData.password || !formData.hospital) {
      toast.error("Please fill all fields")
      return
    }

    const payload = {
      ...formData,
      otp
    }

    const res = await doctorVerifyOtp(payload)

    if (res.status === 201) {
      setFormData({
        name: '',
        specialization: '',
        email: '',
        password: '',
        hospital: ''
      })
      setOtp('')
      setOtpSent(false)

      const { token } = res.data
      localStorage.setItem("token", token)
      const decoded = jwtDecode(token)
      setUser(decoded)
    } else {
      toast.error(res.data.msg)
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
          placeholder='Enter Name'
        />
        <input
          className='outline'
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder='Enter Specialization'
        />
        <div className="flex gap-2">
          <input
            className='outline flex-1'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter Email'
            disabled={otpSent} // same behavior as admin signup
          />
          <button
            className="bg-amber-200 cursor-pointer px-2"
            type="button"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </div>
        <input
          className='outline'
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder='Enter OTP'
        />
        <input
          className='outline'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder='Enter Password'
        />
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
          onClick={onRegister}
        >
          Signup
        </button>
      </div>
    </div>
  )
}

export default DoctorSignup
