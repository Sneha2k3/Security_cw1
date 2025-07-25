const mongoose = require('mongoose');
require('dotenv').config()

const uri = process.env.MONGODB_URI;

async function connectdb() {
    console.log(uri);
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected successfully to MongoDB with Mongoose');
    } catch (error) {
        console.error('Connection error:', error);
    }
}

module.exports = connectdb;