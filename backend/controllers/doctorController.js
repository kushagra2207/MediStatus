const Doctor = require('../models/Doctor')

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .select('-password')
            .populate('hospital', 'name address contact')
        res.status(200).json(doctors)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

const getDoctorByHospital = async (req, res) => {
    try {
        const doctors = await Doctor.find({ hospital: req.params.hospitalId })
            .select('-password')
        res.status(200).json(doctors)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
            .select('-password')
            .populate('hospital', 'name address contact')
        if (!doctor) {
            return res.status(404).json({ msg: 'Doctor not found' })
        }
        res.status(200).json(doctor)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const addAvailability = async (req, res) => {
    try {
        const doctor = req.user

        doctor.availability.push(req.body)
        await doctor.save()

        res.status(200).json({ msg: "Slot Added", availability: doctor.availability })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const editAvailability = async (req, res) => {
    try {
        const doctor = req.user
        const index = req.params.index

        if (!doctor.availability[index]) return res.status(400).json({ msg: "Invalid Availability Index" })

        doctor.availability[index] = req.body
        await doctor.save()

        res.status(200).json({ msg: "Slot Updated", availability: doctor.availability })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const deleteAvailability = async (req, res) => {
    try {
        const doctor = req.user
        const index = req.params.index

        if (!doctor.availability[index]) return res.status(400).json({ msg: "Invalid Availability Index" })

        doctor.availability.splice(index, 1)
        await doctor.save()

        res.status(200).json({ msg: "Slot Removed", availability: doctor.availability })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = { getAllDoctors, getDoctorByHospital, getDoctorById, addAvailability, editAvailability, deleteAvailability }