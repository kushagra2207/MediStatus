const express = require("express");
const { sendDoctorOtp, verifyDoctorOtp, doctorLogin } = require("../controllers/doctorAuthController")
const { authRateLimiter } = require('../middlewares/rateLimiter')

const router = express.Router()

router.post("/signup-getOtp", authRateLimiter, sendDoctorOtp)
router.post("/signup-verifyOtp", authRateLimiter, verifyDoctorOtp)
router.post("/login", authRateLimiter, doctorLogin)

module.exports = router
