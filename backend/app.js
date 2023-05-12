"use strict";

const express = require('express');
const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
const cors = require('cors');
const path = require('path');

// Empezar a inicializar con el comando node .\backend\app.js
const app = express();

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
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//Indica donde está los archivos del frontend.
// app.use(express.static(path.join(__dirname, '../frontend/src')));
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
    // res.json(carta());
    let lcarta = carta();
    res.render('index', { lcarta });
});

app.get('/admin', (req, res) => {
    // res.send('Hola mundo!');
    res.sendFile(path.join(__dirname, '../frontend/src/login.html'));
});

app.use(cors());

//Para entender la informacion de un formulario.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/login', (req, res) => {
    console.log("body", req.body);
    let ob = req.body;
    loguear(ob);
});

app.listen(process.env.PORT, () => {
    console.log("__Servidor levantado.__");
});

/**
 * Funcion para enviar todos los platos que
 * existen de la base de datos
 */
function carta(){
    Plato.find({})
        .then(platos => {
            if (platos) {
                return platos;
            } else {
                console.log('No se encontró el usuario.');
                return null;
            }
        })
        .catch(err => {
            console.log('Error al buscar el usuario: ',err);
        });
}

function loguear(ob){
    Usuario.findOne({nombre: ob.nombre})
    .then(usuario => {
        if (usuario) {
            console.log(usuario);
        } else {
            console.log('No se encontró el usuario.');
            return null;
        }
    })
    .catch(err => {
        console.log('Error al buscar el usuario: ',err);
    });
}