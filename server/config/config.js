require('dotenv').config()

// config/config.js
module.exports = {
    secretKey: process.env.SECRET_KEY || 'your-secret-key',
    databaseURL: process.env.DB_URL || 'mongodb://localhost:27017/ecommerce',
};
