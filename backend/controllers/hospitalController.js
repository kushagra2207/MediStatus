const Hospital = require('../models/Hospital')

const addHospital = async (req, res) => {
    try {
        const { name, address, contact, description } = req.body
        const hospital = new Hospital({ name, address, contact, description })
        await hospital.save()
        res.status(201).json(hospital)
    }
    catch(error) {
        res.status(400).json({ msg: error.message })
    }
}

const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find()
        res.json(hospitals)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = { addHospital, getAllHospitals }