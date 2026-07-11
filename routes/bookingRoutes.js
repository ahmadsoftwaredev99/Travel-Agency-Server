const express = require('express');
const router = express.Router();
const {createBooking, getMyBookings, getAllBookings,updateBookingStatus,cancelBooking,deleteBooking,} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.post('/', protect, createBooking);                     
router.get('/my', protect, getMyBookings);                     
router.get('/', protect, admin, getAllBookings);               
router.put('/:id/status', protect, admin, updateBookingStatus);
router.put('/:id/cancel', protect, cancelBooking);             
router.delete('/:id', protect, admin, deleteBooking);          

module.exports = router;