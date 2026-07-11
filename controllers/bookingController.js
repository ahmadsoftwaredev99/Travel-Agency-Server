const Booking = require('../models/Booking');
const Package = require('../models/Package');


const createBooking = async (req, res) => {
  try {
    const { packageId, travelDate, numOfPeople } = req.body;

    if (!packageId || !travelDate || !numOfPeople) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    if (!pkg.availability) {
      return res.status(400).json({ message: 'This package is currently not available for booking' });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      packageId,
      travelDate,
      numOfPeople,
      status: 'pending',
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('packageId', 'title location price image duration')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter)
      .populate('packageId', 'title location price')
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    const updatedBooking = await booking.save();

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending bookings can be cancelled' });
    }

    booking.status = 'cancelled';
    const updatedBooking = await booking.save();

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.deleteOne();

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createBooking,getMyBookings, getAllBookings,updateBookingStatus,cancelBooking,deleteBooking,};