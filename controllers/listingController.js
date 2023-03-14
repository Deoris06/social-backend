const asyncHandler = require('express-async-handler')
const Listing = require('../models/listingModel.js')
const cloudinary = require('cloudinary');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const imageToBase64 = require('image-to-base64');


// @desc    Add News
// @route   POST /api/news/addNews
// @access  Private


const listings = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body)
   
    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }
    let imageLink = [];
    console.log(images)
    for(let i = 0; i < images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'risha/admin'
        });
        console.log(result, 'kio')
        imageLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    console.log(imageLink)
    req.body.images = imageLink
    console.log(req.body.images)
    const list = await Listing.create(req.body)
    console.log(list)
    res.status(200).json({
        success: true,
        list
    })
})
const addCategory = asyncHandler(async (req, res) => {
    const { category_name } = req.body
    const category = await Category.findOne({ category_name: category_name });

    if (category) {
        return res.status(401).json({
            success: false,
            msg: 'Category already added.'
        })
    }

    const new_cat = await Category.create({ category_name });

    res.status(201).json({
        success: true,
        msg: 'Category created',
        data: new_cat
    })


})


const deleteCategory = asyncHandler(async (req, res) => {
    console.log(req.params.catId)
    const category = await Category.findByIdAndDelete(req.params.catId);

    console.log(category)

    res.status(201).json({
        success: true,
        msg: 'Successfully Deleted',
        data: category
    })

    if (!category) {
        return res.status(401).json({
            success: false,
            msg: 'Category not found.'
        })
    }

})



const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({})
    res.json({
        success: true,
        data: categories
    })
})


const editCategory = asyncHandler(async (req, res) => {
    let category = await Category.findById(req.params.catId);

    if (!category) {
        return res.status(401).json({
            success: false,
            msg: 'Category not found.'
        })
    }

    category = await Category.findByIdAndUpdate(req.params.catId, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: category, msg: 'Successfully updated' });
})



const imageUpload = asyncHandler(async (req, res) => {
    // CHANGE: The path to your service account
    console.log(req.files);

    imageToBase64(req.files.images.path) // Path to the image
    .then(
        (response) => {
            console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
            res.json({
                path: response
            })
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
        }
    )

}
)

const getAllList = asyncHandler(async(req, res) => {
    let populateQuery = [{path:'category', select:'name'}, {path:'userId', select:'name'}];
    const lists = await Listing.find().populate(populateQuery);

    res.status(200).json({
        success: true,
        lists
    })
})

module.exports = {
    listings,
    getAllList
}