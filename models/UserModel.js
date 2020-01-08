const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Username is required']
  },
  name: {
    type: String,
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
