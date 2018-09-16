'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/calc', require('./routes/calc'));

app.use((req, res) => res.status(404).send('Not found'));

module.exports = app;