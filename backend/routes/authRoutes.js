const express = require('express')
const { refresh, logout } = require('../controllers/authController')
const { authRateLimiter } = require('../middlewares/rateLimiter')

const router = express.Router()

router.post("/refresh", authRateLimiter, refresh)
router.post("/logout", logout)

module.exports = router

