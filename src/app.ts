import express from 'express';
import router from './api-routes/routes';
import path from 'path'
const morgan = require("morgan")

require('dotenv-safe').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(router);

module.exports = app;