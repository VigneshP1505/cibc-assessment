const mongoose = require('mongoose');

const config=require("./config")

module.exports = async function connectDB() {
    try {
        await mongoose.connect(
            `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_NAME}.b58jl09.mongodb.net/?retryWrites=true&w=majority&appName=transactions`
        );
    } catch (error) {
        console.log(error)
        console.error('Error connecting to database');
        process.exit(1);
    }
}