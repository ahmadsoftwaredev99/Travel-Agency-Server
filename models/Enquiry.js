const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    name: {type: String,required: [true, 'Name is required'],trim: true,},
    email: {type: String,required: [true, 'Email is required'],lowercase: true,trim: true,},
    phone: {type: String,trim: true, },
    message: {type: String,required: [true, 'Message is required'], },
    status: {type: String, enum: ['new', 'in_progress', 'resolved'],default: 'new',},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enquiry', enquirySchema);