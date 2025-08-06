const express = require('express')
const { getAllDoctors, getDoctorByHospital, getDoctorById } = require('../controllers/doctorController')

const router = express.Router()

router.get('/', getAllDoctors)
router.get('/:hospitalId', getDoctorByHospital)
router.get('/:id', getDoctorById)

module.exports = router