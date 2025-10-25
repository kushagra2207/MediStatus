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
const { protectedRateLimiter, publicRateLimiter } = require('../middlewares/rateLimiter')

const router = express.Router()

router.get('/', publicRateLimiter, getAllDoctors)
router.get('/hospital/:hospitalId', publicRateLimiter, getDoctorByHospital)
router.get('/id/:id', publicRateLimiter, getDoctorById)

router.post('/availability', protectedRateLimiter, requireAuth, checkRole("doctor"), addAvailability)
router.put('/availability/:index', protectedRateLimiter, requireAuth, checkRole("doctor"), editAvailability)
router.delete('/availability/:index', protectedRateLimiter, requireAuth, checkRole("doctor"), deleteAvailability)

module.exports = router