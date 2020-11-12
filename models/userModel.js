const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, '請輸入E-mail。'],
    unique: [true, 'E-mail已經註冊。'],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'E-mail格式錯誤'],
  },
  password: {
    type: String,
    required: [true, '請輸入密碼。'],
  },
  confirmPassword: {
    type: String,
    required: [true, '密碼不相符，請再次輸入密碼。'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: '密碼不相符，請重新輸入。',
    },
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
});

userSchema.methods.comparePassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
