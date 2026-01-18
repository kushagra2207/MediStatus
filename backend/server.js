const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')

dotenv.config()

const app = express()
app.set('trust proxy', 1)
app.use(express.json())

const allowedOrigins = [
  process.env.FRONTEND_URL,
  undefined
]

app.use(cors({
  origin: function (origin, callback) {
    if(!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    }
    else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

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
const adminRoutes = require('./routes/adminRoutes')
app.use('/api/hospitals', hospitalRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/medicines', medicineRoutes)
app.use('/api/admins', adminRoutes)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  connectDB()
})
