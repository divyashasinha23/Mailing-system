const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./Routes/routes');
const emailRoute = require('./Routes/OneDayMail');
const SecondEmailRoute = require('./Routes/SecondMail');
const MonthlyEmailRoute = require('./Routes/MonthlyMail');
const WeeklyEmailRoute = require('./Routes/WeeklyMail');
const YearlyEmailRoute = require('./Routes/YearlyMail');
const connectDB = require('./config/db');
const colors = require('colors');
const cors = require('cors');


dotenv.config();

connectDB();


app.use(express.json());
app.use(cors())
app.use('/app',userRoute);
app.use('/app', emailRoute);
app.use('/app', SecondEmailRoute);
app.use('/app', MonthlyEmailRoute);
app.use('/app', WeeklyEmailRoute);
// app.use('/app', YearlyEmailRoute);



app.listen(5000, () => {
    console.log('Server started at port 5000');
})