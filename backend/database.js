"use strict";

const mongoose = require('mongoose');

// para inicializar la basa de datos se tiene que poner
// en la terminal mongod.
mongoose.connect('mongodb://localhost:27017/Restaurante', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndex: true,
    findOneAndUpdate: false
}).then(() => {
    console.log('Conexión existosa a la base de datos.');
}).catch(err => {
    console.log('Error al conectarse a la base de datos.',err);
});