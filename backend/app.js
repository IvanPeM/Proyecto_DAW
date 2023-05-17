"use strict";

const express = require('express');
const exphbs = require('express-handlebars');
// const { engine } = require('express-handlebars');
const cors = require('cors');
const path = require('path');

// Empezar a inicializar con el comando node .\backend\app.js
const app = express();
app.use(cors());

// Exportar dotenv para que funcione .env
require('dotenv').config();

// Exporto la base de datos para que inicie.
require('./database');

// Exporto todos los models para utilizarlos.
const Plato = require('./model/Plato.model.js');
const Mesa = require('./model/Mesa.model.js');
const Usuario = require('./model/Usuario.model.js');

// Configurar las plantillas Handlebars.
app.set('views', path.join(__dirname, '../frontend/src/views'));
const hbs = exphbs.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Indica donde está los archivos del frontend.
// app.use(express.static(path.join(__dirname, '../frontend/src')));
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/', async (req, res) => {

    try {
        let platos = await Plato.find({});
        if (platos) {
            res.render('index', { lcarta: platos });
        } else {
            console.log('No se encontraron platos.');
            res.render('index', { lcarta: null });
        }
    } catch (error) {
        console.log('Error al buscar los platos:', error);
        res.render('index', { lcarta: null });
    }
});

app.get('/login', (req, res) => {
    // res.send('Hola mundo!');
    res.sendFile(path.join(__dirname, '../frontend/src/login.html'));
});

app.get('/login/admin', async (req, res) => {
    try {
        let platos = await Plato.find({});
        if (platos) {
            res.render('admin', { lcarta: platos });
        } else {
            console.log('No se encontraron platos.');
            res.render('admin', { lcarta: null });
        }
    } catch (error) {
        console.log('Error al buscar los platos:', error);
        res.render('admin', { lcarta: null });
    }
});

app.use(cors());

//Para entender la informacion de un formulario.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/login', async (req, res) => {
    console.log("body", req.body);
    let ob = req.body;
    let usuario = await Usuario.findOne({ nombre: ob.nombre, pass: ob.pass });
    if (usuario) {
        console.log('usuario', usuario);
        res.json({ redirectUrl: '/login/admin' });
    } else {
        console.log('No se encontró el usuario.');
    }
});

app.listen(process.env.PORT, () => {
    console.log("__Servidor levantado.__");
});
