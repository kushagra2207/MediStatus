const RefreshToken = require('../models/RefreshToken')
const Doctor = require('../models/Doctor')
const Admin = require('../models/Admin')
const { createAccessToken, createRefreshToken, setRefreshCookie, clearRefreshCookie } = require('../utils/jwt')

const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken

        if (!token) {
            return res.status(401).json({ msg: "No refresh token provided" })
        }

        // Find the refresh token in database
        const storedToken = await RefreshToken.findOne({ token })

        if (!storedToken) {
            return res.status(401).json({ msg: "Invalid refresh token" })
        }

        // Check if expired (extra safety — MongoDB TTL may have slight delay)
        if (storedToken.expiresAt < new Date()) {
            await RefreshToken.deleteOne({ _id: storedToken._id })
            clearRefreshCookie(res)
            return res.status(401).json({ msg: "Refresh token expired" })
        }

        // Verify the user still exists
        let user
        if (storedToken.userRole === 'doctor') {
            user = await Doctor.findById(storedToken.userId)
        } else if (storedToken.userRole === 'admin') {
            user = await Admin.findById(storedToken.userId)
        }

        if (!user) {
            await RefreshToken.deleteOne({ _id: storedToken._id })
            clearRefreshCookie(res)
            return res.status(401).json({ msg: "User not found" })
        }

        // Token rotation — delete old token, create new one
        await RefreshToken.deleteOne({ _id: storedToken._id })

        const newAccessToken = createAccessToken({
            id: user._id,
            role: storedToken.userRole,
            hospital: user.hospital
        })
        const newRefreshToken = await createRefreshToken(user._id, storedToken.userRole)
        setRefreshCookie(res, newRefreshToken)

        res.status(200).json({ accessToken: newAccessToken })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken

        if (token) {
            // Delete refresh token from database
            await RefreshToken.deleteOne({ token })
        }

        clearRefreshCookie(res)

        res.status(200).json({ msg: "Logged out successfully" })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = { refresh, logout }