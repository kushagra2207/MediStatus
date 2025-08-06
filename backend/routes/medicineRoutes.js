const express = require('express')
const {
    addMedicine,
    getMedicinesByHospital,
    updateMedicine,
    deleteMedicine
} = require('../controllers/medicineController')
const { requireAuth, checkRole } = require('../middlewares/auth')

const router = express.Router()

router.post('/', requireAuth, checkRole("admin"), addMedicine)
router.get('/:hospitalId', requireAuth, getMedicinesByHospital)
router.patch('/:id', requireAuth, checkRole("admin"), updateMedicine)
router.delete('/:id', requireAuth, checkRole("admin"), deleteMedicine)

module.exports = router