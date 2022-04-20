const mongoose = require("mongoose");

const db = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database");
    } catch {
        console.log("Failed to connect to the databse, internal server error");
    }
}

module.exports = db;