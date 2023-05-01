"use strict";

const express = require('express');
const cors = require('cors');

const app = express();

app.get('/', (req, res) => {
    res.send('Hola mundo!');
});


app.use(cors());
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