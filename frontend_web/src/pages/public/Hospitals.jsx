import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { Link } from 'react-router-dom'

const Hospitals = () => {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-blue-100 flex-grow p-5">
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

            </div>
        </div>
    )
}

export default Hospitals