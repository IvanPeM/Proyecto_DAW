"use strict";

const mongoose = require('mongoose');

// Exporto los dos models.
const Plato = require('./model/Plato.model.js');
const Mesa = require('./model/Mesa.model.js');

// La URL de la base de datos
const DBURL = process.env.MONGODB_URL;
console.log(DBURL);

// Me conencto a la base de datos.
mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('___Conexión existosa a la base de datos.___')
).catch(err => console.error(err));

// Prueba para ver como funciona añadir un nuevo plato.
// const pruebaPlato = new Plato({
//     nombre: 'prueba',
//     numero: 1,
//     foto: 'plato01',
//     precio: 0,
//     ingredientes: ['Salmón','Arroz']
// });

// Guardar en la base de datos el plato de prueba.
// pruebaPlato.save()
//     .then(platoGuardado => {
//         console.log('Plato guardado:', platoGuardado);
//     })
//     .catch(error => {
//         console.error('Error al guardar el plato:', error);
//     });

// Buscar en la base de datos todos los Platos.
Plato.find({}).then(result =>{
    console.log(result);
});