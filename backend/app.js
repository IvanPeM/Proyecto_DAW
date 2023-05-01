"use strict";

const express = require('express');
const cors = require('cors');

// Empezar a inicializar con el comando node .\backend\app.js
const app = express();
require('./database');

//Indica donde está los archivos del frontend.
app.use(express.static('frontend/src'));

app.get('/', (req, res) => {
    // res.send('Hola mundo!');
    res.sendFile('index.html');
});

app.get('/admin', (req, res) => {
    // res.send('Hola mundo!');
    res.sendFile('login.html');
});

app.use(cors());

//Para entender la informacion de un formulario.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/colocaFicha', (req, res) => {
    // console.log("body", req.body);
    let ob = req.body;
    ponerFicha(TABLERO, ob.x, ob.y);
});

app.listen(3000, () => {
    console.log("Servidor levantado");
});