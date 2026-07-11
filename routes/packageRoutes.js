const express = require('express');
const router = express.Router();
const {createPackage, getAllPackages,getPackageById,updatePackage,deletePackage,} = require('../controllers/packageController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/', getAllPackages);
router.get('/:id', getPackageById);
router.post('/', protect, admin, createPackage);
router.put('/:id', protect, admin, updatePackage);
router.delete('/:id', protect, admin, deletePackage);

module.exports = router;