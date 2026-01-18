const mongoose = require('mongoose')

let isConnected = false

const connectDB = async () => {
    if(isConnected || mongoose.connection.readyState === 1) {
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });

        isConnected = true;
    }
    catch(error) {
        console.log("MongoDB connection error:", error)
    }
}

mongoose.connection.on('disconnected', () => {
    isConnected = false
})

module.exports = connectDB;