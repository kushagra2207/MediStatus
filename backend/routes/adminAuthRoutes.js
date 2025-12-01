const express = require('express')
const { sendAdminOtp, verifyAdminOtp, adminLogin } = require('../controllers/adminAuthController')
const { authRateLimiter } = require('../middlewares/rateLimiter')

const router = express.Router()

router.post("/signup-getOtp", authRateLimiter, sendAdminOtp)
router.post("/signup-verifyOtp", authRateLimiter, verifyAdminOtp)
router.post("/login", authRateLimiter, adminLogin)

module.exports = router