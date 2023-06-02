"use strict";

const mongoose = require('mongoose');

// Exporto los dos models.
const Plato = require('./model/Plato.model.js');
const Mesa = require('./model/Mesa.model.js');
const Usuario = require('./model/Usuario.model.js');

// La URL de la base de datos
const DBURL = process.env.MONGODB_URL;

// Me conencto a la base de datos.
mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('__Conexión existosa a la base de datos.__')
).catch(err => console.log(err));