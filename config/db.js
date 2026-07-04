const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Erreur de connexiona la BDD : ${error.message}`)
        process.exit(1)
        // 0 => "ok"
        // 1 => "Erreur"
    }
};

module.exports = connectDB;