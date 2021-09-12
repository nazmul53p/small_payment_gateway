/*
 * Title: Basic Payment Gateway - Backend
 * Description: this file run server on http://localhost:3000
 * Author: Nazmul Haque
 * Date: 09/12/2021
 */

// Dependencies
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const { payment } = require('./payment/payment');

// .env file access
dotenv.config();

// app initialization
const app = express();

// app middleware
app.use(cors());
app.use(express.json());

// payment routes
app.post('/payment', payment);

// default error middleware
function defaultError(error, req, res, next) {
    if (res.headersSend) {
        return next(error);
    }
    res.status(500).json({ error: 'Server side error' });
}
app.use(defaultError);
// app run localhost:3000
app.listen(process.env.PORT, () => {
    console.log(`http://${process.env.HOST}:${process.env.PORT}`);
});
