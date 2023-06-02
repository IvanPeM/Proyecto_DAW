"use strict";

const mongoose = require('mongoose');

/**
 * Model del Plato.
 */
const platoSchema = new mongoose.Schema({
    nombre: {type: String,require: true},
    numero: {type: Number,require: true},
    foto: String,
    precio: {type: Number,require: true},
    ingredientes: {type: String,require: true}
},{timestamps: true});

const Plato = mongoose.model('Plato', platoSchema);

module.exports = Plato;