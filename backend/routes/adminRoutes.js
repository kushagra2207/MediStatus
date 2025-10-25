const express = require('express')
const { getAdminById } = require('../controllers/adminController')
const { publicRateLimiter } = require('../middlewares/rateLimiter')

const router = express.Router()

router.get('/:id', publicRateLimiter, getAdminById)

module.exports = router