const Admin = require('../models/Admin')
const { createToken } = require('../utils/jwt')

exports.adminSignup = async (req, res) => {
    try {
        const { name, email, password, hospital } = req.body;

        const existing = await Admin.findOne({ email })
        if(existing) {
            return res.status(400).json({ msg: "Email already registered" })
        }

        const admin = new Admin({ name, email, password, hospital })
        await admin.save()

        const token = createToken({ id: admin._id, role: "admin", hospital: admin.hospital })
        res.status(201).json({ token })
    }
    catch(error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })
        if(!admin) {
            return res.status(404).json({ msg: "Admin not found" })
        }

        const match = await admin.comparePassword(password)
        if(!match) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }

        const token = createToken({ id: admin._id, role: "admin", hospital: admin.hospital })
        res.status(200).json({ token })
    }
    catch(error) {
        res.status(500).json({ msg: error.message })
    }
}