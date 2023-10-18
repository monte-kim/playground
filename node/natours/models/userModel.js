import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-giude', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Must have a password'],
    minlength: 8,
    select: false,
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpiresIn: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
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
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // 1초 앞당김으로써, JWT 생성 시간과 충돌을 예방
  next();
});
userSchema.pre(/^find/, function (next) {
  // (query middleware) this points to current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword, // from req.body
  userPassword // from database
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    // false === JWTTimestamp이 더 최근이면 비밀번호 안 바뀜
    return JWTTimestamp < changedTimeStamp;
  }

  // false === password not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000; // 지금으로부터 10분(10 * 60초 * 1000ms)
  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
