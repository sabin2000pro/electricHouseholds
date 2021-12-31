const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const morgan = require('morgan');