require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 8000


app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(errorHandler)
app.use(fileUpload({
    useTempFiles: true
}))
//Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/customers', require('./routes/customerRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/admin/auth', require('./routes/adminAuthRoutes.js'));
app.use('/customer/auth', require('./routes/customerAuthRoutes'));
app.use('/api',require('./routes/upload'));
 
connectDB().then(()=>{
    console.log('Connected to MongoDB');
});

app.listen(PORT,() => {
    console.log(`Server Running On Port ${PORT} `);
});

