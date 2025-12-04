const Admin = require('../models/Admin')

const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)
            .select('-password')
            .populate('hospital', 'name address contact')
        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' })
        }
        res.status(200).json(admin)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = { getAdminById }