const mongoose = require('mongoose')

let isConnected = false

const connectDB = async () => {
    if(isConnected || mongoose.connection.readyState === 1) {
        return;
        // MongoDB is already connected
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        // MongoDB connected
    }
    catch(error) {
        console.log("MongoDB connection error:", error)
        process.exit(1)
    }
}

module.exports = connectDB;