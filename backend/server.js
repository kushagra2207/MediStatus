const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

// Test
app.get('/', (req, res) => {
  res.send('Server Working')
})

// Auth Routes
const doctorAuthRoutes = require('./routes/doctorAuthRoutes')
const adminAuthRoutes = require('./routes/adminAuthRoutes')
app.use("/api/auth/doctor", doctorAuthRoutes)
app.use("/api/auth/admin", adminAuthRoutes)

// Routes
const hospitalRoutes = require('./routes/hospitalRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const medicineRoutes = require('./routes/medicineRoutes')
app.use('/api/hospitals', hospitalRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/medicines', medicineRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
