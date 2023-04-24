const express = require("express");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser')
const xss = require('xss-clean');
const cors = require("cors");


const app = express()
const routes = require('./Routes/index')

app.use(express.json({
    limit: '100mb'
}))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet());
app.use(cors({
    origin: '*',
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
}));
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'))
// }
const limiter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, Come again in an hour.'
})
app.use('/reazy', limiter);
app.use(express.urlencoded({
    extended: true,
}))
app.use(mongoSanitize());

app.use(xss());

app.use(routes);

module.exports = app;