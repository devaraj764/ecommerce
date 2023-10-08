// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const cors = require('cors');
const morgan = require('morgan');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: "*",
  methods: ['GET', "POST", 'DELETE', "PUT"]
}));
app.use(morgan('dev'));

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', authMiddleware, userRoutes)
app.use('/orders', authMiddleware, orderRoutes)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
