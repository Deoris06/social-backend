const express = require('express');
const { listings, getAllList } = require('../controllers/listingController');
const protect = require('../middleware/authMiddleware');
const router = express.Router()

router.route('/addListings').post(listings);
// router.route('/deleteCategory/:catId').delete(protect, deleteCategory);
router.route('/getAllList').get(getAllList);
// router.route('/editCategory/:catId').put(editCategory);
// router.route('/post/image/fb').post(imageUpload)




module.exports = router
