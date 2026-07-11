const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true, },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true, },
    travelDate: { type: Date, required: [true, 'Travel date is required'],},
    numOfPeople: { type: Number,required: [true, 'Number of people is required'], min: 1,},
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending',},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);