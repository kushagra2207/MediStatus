const express = require('express')
const { adminSignup, adminLogin } = require('../controllers/adminAuthController')
const { authRateLimiter } = require('../middlewares/rateLimiter')

const router = express.Router()

router.post("/signup", authRateLimiter, adminSignup)
router.post("/login", authRateLimiter, adminLogin)

module.exports = router