"use strict";

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('Conexión existosa a la base de datos.');
}).catch(err => {
    console.log('Error al conectarse a la base de datos.',err);
});