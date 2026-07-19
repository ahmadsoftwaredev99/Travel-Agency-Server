const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, required: [true, "Description is required"] },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    route: { type: String, trim: true },
    price: { type: Number, required: [true, "Price is required"] },
    duration: { type: Number, required: [true, "Duration is required"] },
    category: { type: String, trim: true },
    image: { type: [String], default: [] },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    availablePackages: {
      type: Number,
      required: [true, "Available packages are required"],
      min: [0, "Available packages cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Package", packageSchema);
