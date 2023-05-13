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

//? Prueba para ver como funciona añadir un nuevo plato.
// const pruebaPlato = new Plato({
//     nombre: 'prueba 1',
//     numero: 2,
//     foto: 'plato02',
//     precio: 5,
//     ingredientes: ['Salmón','Arroz']
// });

// const pruebaMesa = new Mesa({
//     numero: 1,
//     personas: 4,
//     URL: 'plato01',
//     pedidos: [],
//     recibidos: []
// });

//? Guardar en la base de datos el plato de prueba.
// pruebaPlato.save()
//     .then(platoGuardado => {
//         console.log('Plato guardado:', platoGuardado);
//     })
//     .catch(err => {
//         console.log('Error al guardar el plato:', err);
//     });

// pruebaMesa.save()
//     .then(mesaGuardado => {
//         console.log('Plato guardado:', mesaGuardado);
//     })
//     .catch(err => {
//         console.log('Error al guardar el plato:', err);
//     });

//? Buscar en la base de datos todos los Platos.
// Plato.find({}).then(result =>{
//     console.log(result);
// });

//? Añadir un plato creado a una mesa tambien ya creada.
// Mesa.findOne({numero: 1})
//     .then(mesa => {
//         if(mesa){
//             Plato.findOne({numero: 1})
//                 .then(plato => {
//                     if(plato){
//                         mesa.pedidos.push(plato);
//                         return mesa.save()
//                             .then(mesaGuardada => {
//                                 console.log('Plato agregado a la lista de pedidos: ', mesaGuardada);
//                             })
//                             .catch(err => {
//                                 console.log('Error al agregar el plato a la lista de pedidos: ',err);
//                             });
//                     }else{
//                         console.log('No se encontró el plato.');
//                         return null;
//                     }
//                 })
//         }else{
//             console.log('No se encontró la mesa.');
//         }
//     })
//     .catch(err => {
//         console.log('Error al buscar la mesa: ',err);
//     });

//? Editar un plato ya creado.
// Plato.findOne({ numero: 1 })
//     .then(plato => {
//         if (plato) {
//             plato.nombre = 'prueba editada';

//             return plato.save()
//                 .then(platoGuardado => {
//                     console.log('Plato editado:', platoGuardado);
//                 })
//                 .catch(error => {
//                     console.log('Error al editar el plato:', error);
//                 });
//         } else {
//             console.log('No se encontró el plato');
//             return null;
//         }   
//     })
//     .catch(err => {
//         console.log('Error al buscar la mesa: ',err);
//     });

//? Eliminar un plato ya creado.
// Plato.findOne({ numero: 2 })
//     .then(plato => {
//         if (plato) {
//             plato.nombre = 'prueba editada';

//             return plato.deleteOne()
//                 .then(() => {
//                     console.log('Plato eliminado:');
//                 })
//                 .catch(err => {
//                     console.log('Error al eliminar el plato:', err);
//                 });
//         } else {
//             console.log('No se encontró el plato');
//             return null;
//         }
//     })
//     .catch(err => {
//         console.log('Error al buscar el plato: ',err);
//     });

// Usuario.findOne({nombre: ob.nombre})
//     .then(usuario => {
//         if (usuario) {
//             console.log(usuario);
//         } else {
//             console.log('No se encontró el usuario.');
//             return null;
//         }
//     })
//     .catch(err => {
//         console.log('Error al buscar el usuario: ',err);
//     });