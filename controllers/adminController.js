const User = require('../models/User');
const Package = require('../models/Package');
const Booking = require('../models/Booking');
const Enquiry = require('../models/Enquiry');


const getOverview = async (req, res) => {
  try {
    
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalPackages = await Package.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const openEnquiries = await Enquiry.countDocuments({ status: { $ne: 'resolved' } });

    
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    
    const confirmed = await Booking.find({ status: 'confirmed' }).populate('packageId', 'price');
    const revenue = confirmed.reduce((sum, booking) => {
      return sum + (booking.packageId?.price || 0);
    }, 0);

    
    const recentBookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('packageId', 'title price')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalUsers,
      totalPackages,
      totalBookings,
      openEnquiries,
      bookingsByStatus: {
        pending: pendingBookings,
        confirmed: confirmedBookings,
        cancelled: cancelledBookings,
      },
      revenue,
      recentBookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getOverview };