const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
});

module.exports = mongoose.model("Item", ItemSchema);
