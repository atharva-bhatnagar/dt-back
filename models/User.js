const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: String,
  phone: Number,
  bookings: [
    {
      title: String,
      date: Date,
      customers: Number,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
