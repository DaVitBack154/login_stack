const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);
module.exports = User = mongoose.model('Usermember', UserSchema);
