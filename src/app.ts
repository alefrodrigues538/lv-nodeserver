import express from 'express';
import router from './api-routes/routes';

require('dotenv-safe').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(router);

module.exports = app;