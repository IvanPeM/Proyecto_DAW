"use strict";

const express = require('express');
const cors = require('cors');
const path = require('path');

// Empezar a inicializar con el comando node .\backend\app.js
const app = express();

// Exportar dotenv para que funcione .env
require('dotenv').config();

// Exporto la base de datos para que inicie.
require('./database');

//Indica donde está los archivos del frontend.
app.use(express.static(path.join(__dirname, 'frontend/src')));

app.get('/', (req, res) => {
    // res.send('Hola mundo!');
    res.sendFile(path.join(__dirname, 'frontend/src/index.html'));
});

app.get('/admin', (req, res) => {
    // res.send('Hola mundo!');
    res.sendFile(path.join(__dirname, 'frontend/src/login.html'));
});

app.use(cors());

//Para entender la informacion de un formulario.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/prueba', (req, res) => {
    // console.log("body", req.body);
    let ob = req.body;
});

app.listen(process.env.PORT, () => {
    console.log("__Servidor levantado.__");
});