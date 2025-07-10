const Medicine = require('../models/Medicine')

const addMedicine = async (req, res) => {
    try {
        const { name, quantity, hospital } = req.body
        const medicine = new Medicine({ name, quantity, hospital })
        await medicine.save()
        res.status(201).json(medicine)
    }
    catch(error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find().populate('hospital', 'name')
        res.json(medicines)
    }
    catch(error) {
        res.status(500).json({ message: error.message })
    }
}

const updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id)
        if (!medicine) return res.status(404).json({ message: 'Medicine not found' })

        const { name, quantity } = req.body
        if (name) medicine.name = name
        if (quantity != null) medicine.quantity = quantity

        await medicine.save()
        res.json(medicine)
    }
    catch(error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id)
        if (!medicine) return res.status(404).json({ message: 'Medicine not found' })
        res.json({ message: 'Medicine deleted successfully' })
    }
    catch(error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    addMedicine,
    getAllMedicines,
    updateMedicine,
    deleteMedicine
};