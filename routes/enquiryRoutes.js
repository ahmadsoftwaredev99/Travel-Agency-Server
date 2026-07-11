const express = require('express');
const router = express.Router();
const {createEnquiry,getMyEnquiries,getAllEnquiries,updateEnquiryStatus,
  deleteEnquiry,} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.post('/', protect, createEnquiry);                       
router.get('/my', protect, getMyEnquiries);                      
router.get('/', protect, admin, getAllEnquiries);                
router.put('/:id/status', protect, admin, updateEnquiryStatus);  
router.delete('/:id', protect, admin, deleteEnquiry);            

module.exports = router;