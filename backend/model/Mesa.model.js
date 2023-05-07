const mongoose = require('mongoose');

// Exportar el model de los platos.
const Plato = require('./Plato.model.js');

const mesaSchema = new mongoose.Schema({
    numero: {
        type: Number,
        require: true
    },
    personas: {
        type: Number,
        require: true
    },
    URL: {
        type: String,
        require: true
    },
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plato' }],
    recibidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plato' }]
});

const Mesa = mongoose.model('Mesa', mesaSchema);

module.exports = Mesa;