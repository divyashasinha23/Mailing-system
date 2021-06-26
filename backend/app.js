const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./Routes/routes');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, () => {
    console.log('MongoDB connected');
})

app.use(express.json());
app.use(cors())
app.use('/app',userRoute);



app.listen(5000, () => {
    console.log('Server started at port 5000');
})