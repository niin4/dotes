const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  },
  googleId: String,
});

const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;
