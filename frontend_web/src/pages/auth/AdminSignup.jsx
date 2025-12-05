import { useState } from "react"
import { adminGetOtp, adminVerifyOtp } from "../../api/admin"
import { toast } from "react-toastify"
import { useAuth } from "../../hooks/useAuth"
import { jwtDecode } from "jwt-decode"
import { FaUser, FaEnvelope, FaLock, FaHospital, FaShieldAlt } from "react-icons/fa"
import { MdVerifiedUser } from "react-icons/md"

const AdminSignup = ({ hospitals }) => {
  const [formData, setFormData] = useState({
    name: '',
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

    const res = await adminGetOtp({ email: formData.email })

    if (res.status === 200) {
      setOtpSent(true)
      toast.success(res.data.msg)
    }
    else {
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

    if (!formData.name || !formData.password || !formData.hospital) {
      toast.error("Please fill all fields")
      return
    }

    const payload = {
      ...formData,
      otp
    }

    const res = await adminVerifyOtp(payload)
    if (res.status === 201) {
      setFormData({
        name: '',
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
    }
    else {
      toast.error(res.data.msg)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100">
      <div className='text-center mb-6'>
        <div className="bg-sky-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FaShieldAlt className="text-white text-3xl" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-sky-900">Admin Signup</h2>
        <p className="text-gray-600 mt-2">Create your admin account</p>
      </div>

      <div className='flex flex-col gap-4'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-2">Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className='w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200'
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter Name' />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-2">Email</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className='w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter Email'
                  disabled={otpSent}
                />
              </div>
              <button
                className="bg-sky-600 hover:bg-sky-700 text-white px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 shadow-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={handleSendOtp}
                disabled={otpSent}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-2">OTP</label>
            <div className="relative">
              <MdVerifiedUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className='w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200'
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder='Enter OTP'
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className='w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200'
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder='Enter Password' />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-sky-900 mb-2">Hospital</label>
          <div className="relative">
            <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            <select
              className='w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200 appearance-none bg-white'
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
        </div>
      </div>

      <div className="mt-6">
        <button
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          onClick={onRegister}
        >
          Create Admin Account
        </button>
      </div>
    </div>
  )
}

export default AdminSignup