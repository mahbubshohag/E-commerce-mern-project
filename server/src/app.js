const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
//const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 15, // limit each IP to 15 requests per windowMs
  message: 'Too many requests from this IP, please try again after 1 minute'
});

//app.use(xssClean());
app.use(morgan('dev'));
app.use(rateLimiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", userRouter);



app.get('/test', (req, res) => {
  res.status(200).send({ message: 'api is working fine! ', });
});



//client error handling
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});


//server error handling -> all the errors
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({ success: false, message: err.message, });
});

module.exports = app;
