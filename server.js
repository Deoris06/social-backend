const express = require('express');
const connectDB = require('./config/db');
// const formData = require('express-form-data');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
require('colors');
require('dotenv').config({ path: './config/cofig.env' });
// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: './config/cofig.env' })
const userRoutes = require('./routes/userRoutes.js');
const newsRoutes = require('./routes/newsRoute.js');
const categoryRoutes = require('./routes/categoryRoute');
const listRoutes = require('./routes/listingRoute')
const cloudinary = require('cloudinary')
const morgan = require('morgan');
const errorMiddleware = require('./middleware/errors')



connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

// app.use(formData.parse());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload(
 { useTempFiles: true}
));


app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/list', listRoutes);

app.get('*', function(req, res){
  res.status(404).json({
    msg: "Api path not found."
  });
});
// app.use(errorMiddleware)
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.red,
  ),
);



// hosted server https://news-app-native.herokuapp.com/