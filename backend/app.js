"use strict";

const express = require('express');
const exphbs = require('express-handlebars');
// const { engine } = require('express-handlebars');
const cors = require('cors');
const path = require('path');

// Empezar a inicializar con el comando node .\backend\app.js
const app = express();
app.use(cors());

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
const hbs = exphbs.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Indica donde está los archivos del frontend.
// app.use(express.static(path.join(__dirname, '../frontend/src')));
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/', async (req, res) => {

    try {
        let platos = await Plato.find({});
        if (platos) {
            res.render('index', { lcarta: platos });
        } else {
            console.log('No se encontraron platos.');
            res.render('index', { lcarta: null });
        }
    } catch (error) {
        console.log('Error al buscar los platos:', error);
        res.render('index', { lcarta: null });
    }
});

app.get('/login', (req, res) => {
    // res.send('Hola mundo!');
    res.sendFile(path.join(__dirname, '../frontend/src/login.html'));
});

app.get('/login/admin', async (req, res) => {
    try {
        let platos = await Plato.find({});
        if (platos) {
            res.render('admin', { lcarta: platos });
        } else {
            console.log('No se encontraron platos.');
            res.render('admin', { lcarta: null });
        }
    } catch (error) {
        console.log('Error al buscar los platos:', error);
        res.render('admin', { lcarta: null });
    }
});

app.get('/login/admin/pendientes', async (req, res) => {
    let platos = {};
    try {
        let mesas = await Mesa.find({});
        for (let mesa of mesas) {
            platos[mesa.numero] = [];
            for (let pedido of mesa.pedidos) {
                let plato = await Plato.findOne({ _id: pedido });
                if (plato) {
                    platos[mesa.numero].push(plato);
                }
            }
        }
        if (mesas) {
            res.render('pedidos', { lmesa: mesas, lplato: platos });
        } else {
            console.log('No se encontraron mesas.');
            res.render('pedidos', { lmesa: null, lplato: platos });
        }
    } catch (error) {
        console.log('Error al buscar las mesas:', error);
        res.render('pedidos', { lmesa: null, lplato: platos });
    }
});

app.get('/login/admin/recibidos', async (req, res) => {
    try {
        let mesas = await Mesa.find({});
        if (mesas) {
            res.render('recibidos', { lmesa: mesas });
        } else {
            console.log('No se encontraron mesas.');
            res.render('recibidos', { lmesa: null });
        }
    } catch (error) {
        console.log('Error al buscar las mesas:', error);
        res.render('recibidos', { lmesa: null });
    }
});

app.use(cors());

//Para entender la informacion de un formulario.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/login', async (req, res) => {
    let ob = req.body;
    let usuario = await Usuario.findOne({ nombre: ob.nombre, pass: ob.pass });
    if (usuario) {
        res.json({ redirectUrl: '/login/admin' });
    } else {
        console.log('No se encontró el usuario.');
    }
});

app.post('/editar-plato', async (req, res) => {
    let ob = req.body;
    Plato.findOne({ numero: ob.numero })
        .then(plato => {
            if (plato) {
                plato.nombre = ob.nombre;
                plato.precio = ob.precio;
                plato.foto = ob.foto;
                plato.ingredientes = ob.ingredientes;

                return plato.save()
                    .then(platoGuardado => {
                        res.json({ redirectUrl: '/login/admin' });
                    })
                    .catch(error => {
                        console.log('Error al editar el plato:', error);
                    });
            } else {
                console.log('No se encontró el plato');
                return null;
            }   
        })
        .catch(err => {
            console.log('Error al buscar la mesa: ',err);
        });
});

app.post('/eliminar-plato', async (req, res) => {
    let ob = req.body;
    Plato.findOne({ numero: ob.numero })
        .then(plato => {
            if (plato) {
                return plato.deleteOne()
                    .then(() => {
                        res.json({ redirectUrl: '/login/admin' });
                    })
                    .catch(err => {
                        console.log('Error al eliminar el plato:', err);
                    });
            } else {
                console.log('No se encontró el plato');
                return null;
            }
        })
        .catch(err => {
            console.log('Error al buscar el plato: ',err);
        });
});

app.post('/add-plato', async (req, res) => {
    let ob = req.body;
    const ultimoPlato = await Plato.findOne().sort({ createdAt: -1 });
    let numero = ultimoPlato.numero + 1;
    const anhadirPlato = new Plato({
        nombre: ob.nombre,
        numero: numero,
        foto: ob.foto,
        precio: ob.precio,
        ingredientes: ob.ingredientes
    });
    anhadirPlato.save()
    .then(platoGuardado => {
        res.json({ redirectUrl: '/login/admin' });
    })
    .catch(err => {
        console.log('Error al guardar el plato:', err);
    });
});

app.post('/recibir-plato', async (req, res) => {
    let ob = req.body;
    console.log(ob);
    // let usuario = await Usuario.findOne({ nombre: ob.nombre, pass: ob.pass });
    // if (usuario) {
    //     res.json({ redirectUrl: '/login/admin/pendientes' });
    // } else {
    //     console.log('No se encontró el usuario.');
    // }
});

app.listen(process.env.PORT, () => {
    console.log("__Servidor levantado.__");
});
