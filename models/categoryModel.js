const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    icon: {
        type: String
    },
    backgroundColor: {
        type: String
    },
    color:{
        type: String,
        default: "white"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Category', categorySchema)
