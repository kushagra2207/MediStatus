const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const RefreshToken = require('../models/RefreshToken')

const REFRESH_TOKEN_EXPIRY_DAYS = 7
const ACCESS_TOKEN_EXPIRY = '15m'

const isProduction = () => process.env.NODE_ENV === 'production'

// Create a short-lived JWT access token
exports.createAccessToken = ({ id, role, hospital }) => {
    return jwt.sign(
        { id, role, hospital },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    )
}

// Create an opaque refresh token and store it in the database
exports.createRefreshToken = async (userId, userRole) => {
    const token = crypto.randomBytes(64).toString('hex')
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

    await RefreshToken.create({
        token,
        userId,
        userRole,
        expiresAt
    })

    return token
}

// Set the refresh token as an httpOnly cookie on the response
exports.setRefreshCookie = (res, token) => {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: isProduction(),
        sameSite: isProduction() ? 'None' : 'Lax',
        path: '/api/auth',
        maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    })
}

// Clear the refresh token cookie
exports.clearRefreshCookie = (res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProduction(),
        sameSite: isProduction() ? 'None' : 'Lax',
        path: '/api/auth'
    })
}