const express = require('express');
const router = express.Router();
const { getAllUsers, toggleSuspendUser, getMyProfile, updateMyProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/profile', protect, getMyProfile);       
router.put('/profile', protect, updateMyProfile);    
router.get('/', protect, admin, getAllUsers);
router.put('/:id/suspend', protect, admin, toggleSuspendUser);

module.exports = router;