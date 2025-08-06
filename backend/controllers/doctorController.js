const Doctor = require('../models/Doctor')

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .select('-password')
            .populate('hospital', 'name')
        res.status(200).json(doctors)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

const getDoctorByHospital = async (req, res) => {
    try {
        const doctors = await Doctor.find({ hospital: req.params.hospitalId }).select('-password')
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
            .populate('hospital', 'name')
        if (!doctor) {
            return res.status(404).json({ msg: 'Doctor not found' })
        }
        res.status(200).json(doctor)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = { getAllDoctors, getDoctorByHospital, getDoctorById }