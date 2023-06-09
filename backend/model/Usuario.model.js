"use strict";

const mongoose = require('mongoose');

/**
 * Model del Usuario.
 */
const usuarioScheme = new mongoose.Schema({
    nombre: {type: String,require: true},
    pass: {type: String,require: true}
});

const Usuario = mongoose.model('Usuario', usuarioScheme);

module.exports = Usuario;