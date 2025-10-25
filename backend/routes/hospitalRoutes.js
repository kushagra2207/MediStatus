const express = require('express')
const { addHospital, getAllHospitals } = require('../controllers/hospitalController')
const { publicRateLimiter, authRateLimiter } = require('../middlewares/rateLimiter')

const router = express.Router()

router.post('/', authRateLimiter, addHospital)
router.get('/', publicRateLimiter, getAllHospitals)

module.exports = router