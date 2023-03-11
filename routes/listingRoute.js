const express = require('express');
const { listing } = require('../controllers/listingController');
const protect = require('../middleware/authMiddleware');
const router = express.Router()

router.route('/addCategory').post(addCategory);
router.route('/deleteCategory/:catId').delete(protect, deleteCategory);
router.route('/getAllCat').get(getAllCategories);
router.route('/editCategory/:catId').put(editCategory);
router.route('/post/image/fb').post(imageUpload)




module.exports = router