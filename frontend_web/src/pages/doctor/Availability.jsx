import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import {
  getDoctorById,
  addAvailability,
  editAvailability,
  deleteAvailability
} from "../../api/doctor"
import { toast } from "react-toastify"
import { FaClock, FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaCalendarAlt } from "react-icons/fa"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const Availability = () => {
  const { user } = useAuth()

  const [doctor, setDoctor] = useState(null)
  const [newSlot, setNewSlot] = useState({ day: "", from: "", to: "" })
  const [edititngIndex, setEdititngIndex] = useState(null)

  useEffect(() => {
    const getDoctor = async () => {
      const res = await getDoctorById(user.id)
      if (res.status === 200) {
        setDoctor(res.data)
      }
      else {
        toast.error(`${res.data.msg}`)
      }
    }
    getDoctor()
  }, [])

  const handleChange = async (e) => {
    setNewSlot({ ...newSlot, [e.target.name]: e.target.value })
  }

  const handleAddAvailability = async (newSlot) => {
    const res = await addAvailability(newSlot)

    if (res.status === 200) {
      setDoctor((prev) => ({
        ...prev,
        availability: res.data.availability
      }))
      setNewSlot({ day: "", from: "", to: "" })
      toast.success(`${res.data.msg}`)
    }
    else {
      toast.error(`${res.data.msg}`)
    }
  }

  const handleEditAvailability = async (index, updatedSlot) => {
    const res = await editAvailability(index, updatedSlot)

    if (res.status === 200) {
      setDoctor((prev) => ({
        ...prev,
        availability: res.data.availability
      }))
      setNewSlot({ day: "", from: "", to: "" })
      setEdititngIndex(null)
      toast.success(`${res.data.msg}`)
    }
    else {
      toast.error(`${res.data.msg}`)
    }
  }

  const handleDeleteAvailability = async (index) => {
    const res = await deleteAvailability(index)

    if (res.status === 200) {
      setDoctor((prev) => ({
        ...prev,
        availability: res.data.availability
      }))
      setEdititngIndex(null)
      toast.success(`${res.data.msg}`)
    }
    else {
      toast.error(`${res.data.msg}`)
    }
  }

  const handleEditClick = (slot, index) => {
    setNewSlot(slot)
    setEdititngIndex(index)
  }

  const handleCancelEdit = () => {
    setNewSlot({ day: "", from: "", to: "" })
    setEdititngIndex(null)
  }

  if (!doctor) return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600 mx-auto mb-4"></div>
        <p className="text-xl text-sky-900 font-semibold">Loading Availability...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-900">My Availability</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your schedule and availability</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-sky-600" />
            Current Schedule
          </h2>
          {doctor.availability.length === 0 ? (
            <div className="text-center py-8">
              <FaClock className="text-gray-400 text-5xl mx-auto mb-4" />
              <p className="text-gray-600">No availability slots added yet</p>
              <p className="text-sm text-gray-500 mt-2">Add your first slot below</p>
            </div>
          ) : (
            <div className="space-y-3">
              {doctor.availability.map((slot, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 sm:p-5 border border-blue-100 hover:shadow-md transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg font-bold text-sky-900">{slot.day}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {slot.from}
                        </span>
                        <span className="text-gray-600">to</span>
                        <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {slot.to}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3 sm:flex-shrink-0">
                      <button
                        className="flex-1 sm:flex-none bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2 text-sm"
                        onClick={() => handleEditClick(slot, index)}
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2 text-sm"
                        onClick={() => handleDeleteAvailability(index)}
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100">
          <h2 className="text-lg sm:text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
            {edititngIndex !== null ? (
              <>
                <FaEdit className="text-sky-600" />
                Edit Availability Slot
              </>
            ) : (
              <>
                <FaPlus className="text-sky-600" />
                Add New Availability Slot
              </>
            )}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">Day</label>
                <select
                  name="day"
                  value={newSlot.day}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200 bg-white"
                >
                  <option value="" disabled>Select Day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">From</label>
                <input
                  type="time"
                  name="from"
                  value={newSlot.from}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">To</label>
                <input
                  type="time"
                  name="to"
                  value={newSlot.to}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {edititngIndex !== null ? (
                <>
                  <button
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                    onClick={() => handleEditAvailability(edititngIndex, newSlot)}
                  >
                    <FaSave />
                    Update Slot
                  </button>
                  <button
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                    onClick={handleCancelEdit}
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                  onClick={() => handleAddAvailability(newSlot)}
                >
                  <FaPlus />
                  Add Slot
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Availability