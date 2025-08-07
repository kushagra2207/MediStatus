import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import {
  getDoctorById,
  addAvailability,
  editAvailability,
  deleteAvailability
} from "../../api/doctor"
import { toast } from "react-toastify"

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

  if (!doctor) return <div>Loading Dashboard...</div>

  return (
    <div>
      <h2>Doctor Availability</h2>

      <ul>
        {doctor.availability.map((slot, index) => (
          <li key={index}>
            <div className="flex gap-4">
              <span><strong>{slot.day}</strong>: {slot.from} - {slot.to}{" "}</span>
              <button
                className="cursor-pointer"
                onClick={() => handleEditClick(slot, index)}
              >
                Edit
              </button>
              <button
                className="cursor-pointer"
                onClick={() => handleDeleteAvailability(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <hr />

      <h3>{edititngIndex !== null ? "Edit Slot" : "Add New Slot"}</h3>
      <div className="flex gap-4">
        <select name="day" value={newSlot.day} onChange={handleChange}>
          <option value="" disabled>Select Day</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <input
          type="time"
          name="from"
          value={newSlot.from}
          onChange={handleChange}
        />
        <input
          type="time"
          name="to"
          value={newSlot.to}
          onChange={handleChange}
        />
        {edititngIndex !== null ? (
          <button
            className="cursor-pointer"
            onClick={() => handleEditAvailability(edititngIndex, newSlot)}
          >
            Update
          </button>
        ) : (
          <button
            className="cursor-pointer"
            onClick={() => handleAddAvailability(newSlot)}
          >
            Add
          </button>
        )}
      </div>
    </div>
  )
}

export default Availability