import { useState } from "react"

const DoctorLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
                    className="bg-amber-200">
                    Login
                </button>
            </div>
        </div>

    )
}

export default DoctorLogin