const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must have a name'],
  },
  email: {
    type: String,
    required: [true, 'Must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email form'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Must have a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Must confirm password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
