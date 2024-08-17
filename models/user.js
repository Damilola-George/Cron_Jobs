// File: models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
