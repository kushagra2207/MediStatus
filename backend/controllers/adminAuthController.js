const Admin = require('../models/Admin')
const Otp = require("../models/Otp")
const { createToken } = require('../utils/jwt')
const bcrypt = require('bcrypt')
const mailer = require("../utils/mailer")

const sendAdminOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const exists = await Admin.findOne({ email });
        if (exists) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);

        await Otp.findOneAndUpdate(
            { email },
            {
                email,
                otpHash,
                createdAt: new Date(Date.now())
            },
            { upsert: true, new: true }
        );

        await mailer.sendEmail(
            email,
            "OTP for MediStatus Admin Signup",
            `<p>Your OTP is: <b>${otp}</b></p>`
        );

        res.status(200).json({ msg: "OTP sent to email" });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const verifyAdminOtp = async (req, res) => {
    try {
        const { name, email, password, hospital, otp } = req.body;

        const otpData = await Otp.findOne({ email });
        if (!otpData) return res.status(400).json({ msg: "OTP not found" });

        const match = await bcrypt.compare(otp, otpData.otpHash);
        if (!match) return res.status(400).json({ msg: "Invalid OTP" });

        const admin = new Admin({
            name,
            email,
            password,
            hospital
        });
        await admin.save();

        await Otp.deleteOne({ email });

        const token = createToken({
            id: admin._id,
            role: "admin",
            hospital: admin.hospital
        });

        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" })
        }

        const match = await admin.comparePassword(password)
        if (!match) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }

        const token = createToken({ id: admin._id, role: "admin", hospital: admin.hospital })
        res.status(200).json({ token })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    sendAdminOtp,
    verifyAdminOtp,
    adminLogin
}