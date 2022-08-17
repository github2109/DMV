const mongoose = require("mongoose");

const licenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    text: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});
module.exports = mongoose.model("License", licenseSchema);
