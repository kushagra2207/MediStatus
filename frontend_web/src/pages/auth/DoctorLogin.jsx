import { useState } from "react"
import { doctorLogin } from "../../api/doctor"
import { toast } from "react-toastify"

const DoctorLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onLogin = async (credentials) => {
        let res = await doctorLogin(credentials)
        if (res.status === 200) {
            setEmail("")
            setPassword("")
            const { token } = res.data
            localStorage.setItem("token", token)
        }
        else {
            toast.error(`${res.data.msg}`)
        }
    }

    return (
        <div>
            <div className="text-center">Doctor Login</div>
            <div className="flex flex-col gap-4">
                <input
                    className='outline'
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Email' />
                <input className='outline'
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password' />
            </div>
            <div className="text-center my-4">
                <button
                    className="bg-amber-200 cursor-pointer"
                    onClick={() => onLogin({ email, password })}
                >
                    Login
                </button>
            </div>
        </div>

    )
}

export default DoctorLogin