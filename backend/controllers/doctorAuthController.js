const Doctor = require("../models/Doctor")
const Otp = require("../models/Otp")
const { createToken } = require("../utils/jwt")
const bcrypt = require("bcrypt")
const { sendOtpEmail } = require('../utils/mailer')

const sendDoctorOtp = async (req, res) => {
  try {
    const { email } = req.body

    const exists = await Doctor.findOne({ email })
    if (exists) {
      return res.status(400).json({ msg: "Email already registered" })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpHash = await bcrypt.hash(otp, 10)

    await Otp.findOneAndUpdate(
      { email },
      {
        email,
        otpHash,
        createdAt: new Date(Date.now())
      },
      { upsert: true, new: true }
    );

    await sendOtpEmail(email, otp)

    res.status(200).json({ msg: "OTP sent to email" })
  }
  catch (error) {
    res.status(500).json({ msg: error.message })
  }
};

const verifyDoctorOtp = async (req, res) => {
  try {
    const { name, specialization, email, password, hospital, otp } = req.body

    const otpData = await Otp.findOne({ email })
    if (!otpData) return res.status(400).json({ msg: "OTP not found" })

    const match = await bcrypt.compare(otp, otpData.otpHash)
    if (!match) return res.status(400).json({ msg: "Invalid OTP" })

    const doctor = new Doctor({
      name,
      specialization,
      email,
      password,
      hospital
    })
    await doctor.save()

    await Otp.deleteOne({ email })

    const token = createToken({
      id: doctor._id,
      role: "doctor",
      hospital: doctor.hospital
    })

    res.status(201).json({ token })
  }
  catch (error) {
    res.status(500).json({ msg: error.message })
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" })
    }

    const match = await doctor.comparePassword(password)
    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    const token = createToken({ id: doctor._id, role: "doctor", hospital: doctor.hospital })
    res.status(200).json({ token })
  }
  catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  sendDoctorOtp,
  verifyDoctorOtp,
  doctorLogin
}