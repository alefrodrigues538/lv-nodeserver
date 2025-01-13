import express from 'express';
import path from 'path';
import router from './api-routes/routes';
const morgan = require("morgan")

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(router);

module.exports = app;