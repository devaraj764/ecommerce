// seeders/productSeeder.js
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Assuming your Product model is in the correct path
const data = require('./db');
const { databaseURL } = require('../config/config');

// Sample product data
const products = data.products;

mongoose
    .connect(databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        return Product.deleteMany({});
    })
    .then(() => {
        // Insert the sample products into the database
        return Product.insertMany(products);
    })
    .then(() => {
        console.log('Products seeded successfully');
    })
    .catch((error) => {
        console.error('Error seeding products:', error);
    })
    .finally(() => {
        // Close the database connection
        mongoose.connection.close();
    });
