const asyncHandler = require('express-async-handler')
const Listing = require('../models/listingModel.js')
// const imageToBase64 = require('image-to-base64');


// @desc    Add News
// @route   POST /api/news/addNews
// @access  Private

const listings = asyncHandler(async ( req, res) => {
    // Collect image from student
    let images = []
    // let location = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }else{
        images = req.body.images
    }
    let imageLink = [];
    let errMessage;
    console.log(images)
    if( typeof images !== "undefined" && images.length > 0){
        for(let i = 0; i < images.length; i++){
            const result = await Cloudinary.v2.uploader.upload(images[i], {
                folder: 'listings/list'
            });

            imageLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
    }else{
        
        errMessage  = `Please select an image file`
    }
    // location.push({
    //     latitude: ,
    //     longitude: 
    // })
    // console.log(imageLink.length, 'me')
    // if(imageLink.length === 0){
    //     return next(new ErrorHandler('Please select an image', 500))
    // }
    req.body.images = imageLink
    const list = await Listing.create(req.body);
    
    res.status(201).json({
        success: true,
        message: `${list.name} has been added to list record!`,
        list,
    
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



module.exports = {
    listings
}