import { useState } from "react"
import { addHospital } from '../../api/hospital'
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'

const HospitalRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRegister = async () => {
        let res = await addHospital(formData)
        if(res.status === 201) {
            toast.success(`${res.data.msg}`)
        }
        else {
            toast.error(`${res.data.msg}`)
        }
        setFormData({
            name: '',
            address: '',
            contact: ''
        })
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <div>Hospital Register</div>
            <div className="flex flex-col gap-4">
                <input
                    className='outline'
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter Hospital Name' />
                <input
                    className='outline'
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder='Enter Address' />
                <input
                    className='outline'
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder='Enter Contact' />
            </div>
            <div>
                <button
                    className="bg-blue-200 px-2 py-1 rounded-lg cursor-pointer"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
            <div>
                <Link
                    className="bg-blue-200 px-2 py-1 rounded-lg"
                    to="/hospitals"
                >
                    Back
                </Link>
            </div>
        </div>
    )
}

export default HospitalRegister