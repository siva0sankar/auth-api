const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import routes
const authRoute = require('./routes/auth');
const postRouts = require('../routes/posts')

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    () => { console.log('connected to DB..') })

//Middleware
app.use(express.json());

//Routes Middleware
app.use('/api/user', authRoute);
app.use('/posts', postRouts);

app.listen(3000, () => console.log('Server is started...'))