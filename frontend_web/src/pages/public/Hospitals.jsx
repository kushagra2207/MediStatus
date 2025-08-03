import { useState, useEffect } from "react"
import { getAllHospitals } from "../../api/hospital"
import { IoIosSearch } from "react-icons/io"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"

const Hospitals = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [hospitals, setHospitals] = useState([])

    useEffect(() => {
        const getHospitals = async () => {
            const res = await getAllHospitals()
            if (res.status === 200) {
                setHospitals(res.data)
            }
            else {
                toast.error(`${res.data.msg}`)
            }
        }
        getHospitals()
    }, [])

    const filteredHospitals = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-5">
            <div className="flex justify-between">
                <span>Hospitals</span>
                <Link
                    className="bg-blue-300 rounded-lg px-2 py-1"
                    to="/hospitalRegister"
                >
                    Register
                </Link>
            </div>
            <div className="relative w-full py-4">
                <IoIosSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600
                        " size={20} />
                <input
                    className="bg-white w-full p-2 pl-10 rounded-lg"
                    type="text"
                    placeholder="Search..."
                    name="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="space-y-4">
                {filteredHospitals.length > 0 ? (
                    filteredHospitals.map(hospital => (
                        <div key={hospital._id} className="bg-blue-300">
                            <h3 className="font-bold">{hospital.name}</h3>
                            <p>{hospital.address}</p>
                            <p>{hospital.contact}</p>
                        </div>
                    ))
                ) : (
                    <p>No Hospitals Found</p>
                )
                }
            </div>
        </div>
    )
}

export default Hospitals