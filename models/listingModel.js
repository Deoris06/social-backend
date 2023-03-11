const mongoose = require('mongoose');
// const validator = require('validator');


const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the name'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter the number']
    },
    description: {
        type: String,
        required: [true, 'Please enter the description']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required:[true],
    },
    images: [
        {
            public_id: {
            type: String,
            required: true
            },
            url: {
                type: String,
                required: true
            }
    }
    ],
    location: [
        {
            latitude: {
                type: Number,
                required: false
            },
            longitude: {
                type: Number,
                required: false
            },
        }
    ],
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:[true],
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Listing', ListingSchema);