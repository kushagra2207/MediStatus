const express = require('express')
const { addHospital, getAllHospitals } = require('../controllers/hospitalController')

const router = express.Router()

router.post('/', addHospital)
router.get('/', getAllHospitals)

module.exports = router