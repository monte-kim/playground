import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '이름을 입력해주세요.'],
  },
  loginType: {
    type: String,
    required: [true, '로그인 타입이 필요합니다.'],
  },
  profileImage: {
    type: String,
    default: 'default.jpg',
  },
  email: {
    type: String,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
