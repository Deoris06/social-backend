const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URI)
    mongoose.connection.once('open', function () {
        console.log('MongoDB database connection established successfully')
      })
};

module.exports = connectDB;
