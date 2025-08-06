const express = require('express')
const { 
    getAllDoctors, 
    getDoctorByHospital, 
    getDoctorById,
    addAvailability,
    editAvailability,
    deleteAvailability
} = require('../controllers/doctorController')
const { requireAuth, checkRole } = require('../middlewares/auth')

const router = express.Router()

router.get('/', getAllDoctors)
router.get('/hospital/:hospitalId', getDoctorByHospital)
router.get('/id/:id', getDoctorById)

router.post('/availability', requireAuth, checkRole("doctor"), addAvailability)
router.put('/availability/:index', requireAuth, checkRole("doctor"), editAvailability)
router.delete('/availability/:index', requireAuth, checkRole("doctor"), deleteAvailability)

module.exports = router