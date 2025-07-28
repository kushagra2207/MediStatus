const Doctor = require("../models/Doctor");
const { createToken } = require("../utils/jwt");

exports.doctorSignup = async (req, res) => {
  try {
    const { name, specialization, email, password, hospital } = req.body;

    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" })

    const doctor = new Doctor({
      name,
      specialization,
      email,
      password,
      hospital,
    })

    await doctor.save()

    const token = createToken({ id: doctor._id, role: "doctor", hospital: doctor.hospital });
    res.status(201).json({ token })
  }
  catch(error) {
    res.status(500).json({ msg: error.message })
  }
};

exports.doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    const match = await doctor.comparePassword(password)
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = createToken({ id: doctor._id, role: "doctor", hospital: doctor.hospital });
    res.status(200).json({ token })
  }
  catch(error) {
    res.status(500).json({ msg: error.message });
  }
};
