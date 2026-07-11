const express = require('express');
const router = express.Router();
const { getOverview } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/overview', protect, admin, getOverview);

module.exports = router;