const express = require('express');
const db = require('./src/app/db')
require('dotenv').config();

const app = express();

//Config express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//conexión DB
db();

//rutas
app.use(require('./src/routers/setup'));

module.exports = app;
