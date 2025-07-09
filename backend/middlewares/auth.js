const jwt = require('jsonwebtoken')
const Doctor = require('../models/Doctor')
const Admin = require('../models/Admin')

exports.requireAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({ msg: "No token provided" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        let user;

        if(decoded.role === "doctor") {
            user = await Doctor.findById(decoded.id).select("-password")
        }
        else if(decoded.role === "admin") {
            user = await Admin.findById(decoded.id).select("-password")
        }

        if(!user) {
            return res.status(401).json({ msg: "User not found" })
        }

        req.user = user
        req.userRole = decoded.role
        next()
    }
    catch(error) {
        return res.status(401).json({ msg: "Invalid token" })
    }
}

exports.checkRole = (role) => (req, res, next) => {
    if(req.userRole !== role) {
        return res.status(403).json({ msg: "Access denied" })
    }
    next();
}