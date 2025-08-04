const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const petsRouter = require('./controllers/pets');

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(express.json());
app.use(logger('dev'));

// Routes go here

app.get('/', (req, res) => {
  res.send('Welcome to the Pets API!');
});

app.use('/pets', petsRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});