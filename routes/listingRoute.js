const express = require('express');
const Listing = require('../models/listingModel.js')
// const multer =  require('multer');
const cloudinary = require('cloudinary')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
// const upload = multer({
//   dest: "uploads/",
//   limits: { fieldSize: 25 * 1024 * 1024 },
// });
const { listings, getAllList } = require('../controllers/listingController');
const protect = require('../middleware/authMiddleware');
const router = express.Router()

router.post("/addListings", 
catchAsyncErrors(async (req, res)=>{
  let storeImage = []
 if(Object.keys(req.files.images).length >= 9){
    storeImage.push(req.files.images.tempFilePath)
}else{
  req.files.images.map(x => {
    storeImage.push(x.tempFilePath)
  })
}
  // console.log(storeImage, 'o')
  
  let imageLink = [];
  for(let i = 0; i < storeImage.length; i++){
    const result = await cloudinary.v2.uploader.upload(storeImage[i], {
        folder: 'drag/assets'
    });
    // console.log(result, 'k')
    imageLink.push({
        public_id: result.public_id,
        url: result.secure_url
    })
  }

  req.body.images = imageLink
  req.body.price = parseFloat(req.body.price)
  req.body.location = JSON.parse(req.body.location)
  // console.log(req.body)
  const list = await Listing.create(req.body)
  res.status(200).json({
    success: true,
    list
  });
}));
// router.route('/deleteCategory/:catId').delete(protect, deleteCategory);
router.route('/getAllList').get(getAllList);
// router.route('/editCategory/:catId').put(editCategory);
// router.route('/post/image/fb').post(imageUpload)




module.exports = router
