import { useState } from "react"
import { doctorLogin } from "../../api/doctor"
import { toast } from "react-toastify"
import { useAuth } from "../../hooks/useAuth"
import { jwtDecode } from "jwt-decode"
import { FaEnvelope, FaLock, FaUserMd } from "react-icons/fa"

const DoctorLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { setUser } = useAuth()

    const onLogin = async (credentials) => {
        const res = await doctorLogin(credentials)
        if (res.status === 200) {
            setEmail("")
            setPassword("")
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
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-blue-100">
            <div className='text-center mb-8'>
                <div className="bg-sky-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaUserMd className="text-white text-3xl" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-sky-900">Doctor Login</h2>
                <p className="text-gray-600 mt-2">Welcome back! Please login to your account</p>
            </div>

            <div className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-semibold text-sky-900 mb-2">Email</label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            className='w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200'
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Email' />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-sky-900 mb-2">Password</label>
                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            className='w-full p-4 pl-12 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200'
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Password' />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                    onClick={() => onLogin({ email, password })}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default DoctorLogin