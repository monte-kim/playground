const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: [true, 'Must have a password confirm'],
    validate: {
      // This only works on CREATE & SAVE
      validator: function (val) {
        return val === this.password;
      },
      message: 'Password not same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //   hash the pw with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // passwordConfirm은 확인됐으면 더 이상 필요하지 않아(DB에 저장할 필요 없음)
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
