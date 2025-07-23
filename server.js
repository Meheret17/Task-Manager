const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/tasks'));
const PORT = process.env.PORT || 3000;
//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})