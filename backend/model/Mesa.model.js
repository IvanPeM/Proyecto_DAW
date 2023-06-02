"use strict";

const mongoose = require('mongoose');

// Exportar el model de los platos.
const Plato = require('./Plato.model.js');

/**
 * Model de la Mesa.
 */
const mesaSchema = new mongoose.Schema({
    numero: {type: Number,require: true},
    personas: {type: Number,require: true},
    pedidos: [{ plato: { type: mongoose.Schema.Types.ObjectId, ref: 'Plato' }, cantidad: { type: Number, default: 0 } }],
    recibidos: [{ plato: { type: mongoose.Schema.Types.ObjectId, ref: 'Plato' }, cantidad: { type: Number, default: 0 } }]
});

const Mesa = mongoose.model('Mesa', mesaSchema);

module.exports = Mesa;