// File: index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const User = require('./models/user');
const cron = require('node-cron');
const sendBirthdayEmail = require('./emailSender');

const app = express();
const PORT = process.env.PORT || 5000;


// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));



// Connect to MongoDB
mongoose.connect( process.env.CONNECTION_STRING, {

});

// Display form to add user
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission
app.post('/add-user', async (req, res) => {
  const { username, email, date_of_birth } = req.body;
  try {
    await User.create({ username, email, date_of_birth });
    res.send('User added successfully!');
  } catch (error) {
    res.status(400).send('Error adding user: ' + error.message);
  }
});



// Schedule cron job to run every day at 7 AM
cron.schedule('0 7 * * *', async () => {
  const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
  const users = await User.find({ date_of_birth: today });

  users.forEach(user => {
    sendBirthdayEmail(user);
  });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
