const express = require('express')
const {
    addMedicine,
    getMedicinesByHospital,
    updateMedicine,
    deleteMedicine
} = require('../controllers/medicineController')
const { requireAuth, checkRole } = require('../middlewares/auth')
const { protectedRateLimiter } = require('../middlewares/rateLimiter')

const router = express.Router()

router.post('/', protectedRateLimiter, requireAuth, checkRole("admin"), addMedicine)
router.get('/:hospitalId', protectedRateLimiter, requireAuth, getMedicinesByHospital)
router.patch('/:id', protectedRateLimiter, requireAuth, checkRole("admin"), updateMedicine)
router.delete('/:id', protectedRateLimiter, requireAuth, checkRole("admin"), deleteMedicine)

module.exports = router