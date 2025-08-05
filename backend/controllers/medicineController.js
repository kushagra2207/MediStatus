const Medicine = require('../models/Medicine')

const addMedicine = async (req, res) => {
    try {
        const { name, quantity, hospital } = req.body
        const medicine = new Medicine({ name, quantity, hospital })
        await medicine.save()
        res.status(201).json({ msg: "Medicine Added Successfully" })
    }
    catch(error) {
        if(error.name === "ValidationError") {
            res.status(400).json({ msg: error.message })
        }
        else {
            res.status(500).json({ msg: error.message })
        }
    }
}

const getMedicinesByHospital = async (req, res) => {
    const { hospitalId } = req.params

    try {
        const medicines = await Medicine.find({ hospital: hospitalId }).populate('hospital', 'name')
        res.status(200).json(medicines)
    }
    catch(error) {
        res.status(500).json({ msg: error.message })
    }
}

const updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id)
        if (!medicine) return res.status(404).json({ msg: 'Medicine not found' })

        const { name, quantity } = req.body
        if (name) medicine.name = name
        if (quantity != null) medicine.quantity = quantity

        await medicine.save()
        res.status(200).json({ msg: "Medicine Updated Successfully" })
    }
    catch(error) {
        if(error.name === "ValidationError") {
            res.status(400).json({ msg: error.message })
        }
        else {
            res.status(500).json({ msg: error.message })
        }
    }
}

const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id)
        if (!medicine) return res.status(404).json({ msg: 'Medicine not found' })
        res.status(200).json({ message: 'Medicine deleted successfully' })
    }
    catch(error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    addMedicine,
    getMedicinesByHospital,
    updateMedicine,
    deleteMedicine
};