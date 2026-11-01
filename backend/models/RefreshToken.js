const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userRole: {
        type: String,
        required: true,
        enum: ['doctor', 'admin']
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, { timestamps: true })

// TTL index — MongoDB auto-deletes expired documents
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)