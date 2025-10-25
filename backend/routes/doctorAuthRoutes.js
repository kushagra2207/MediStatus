const express = require("express");
const { doctorSignup, doctorLogin } = require("../controllers/doctorAuthController")
const { authRateLimiter } = require('../middlewares/rateLimiter')

const router = express.Router()

router.post("/signup", authRateLimiter, doctorSignup)
router.post("/login", authRateLimiter, doctorLogin)

module.exports = router
