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

app.get('/mesa/:id', async (req, res) => {
    const mesaId = req.params.id;
    
    try {
        const mesa = await Mesa.findOne({ _id: mesaId });
        let ultimoPlato = await Plato.findOne().sort({ createdAt: -1 });
        let platos = await Plato.find({});
        if (mesa) {
            res.render('menu', { lcarta: platos, mesa: mesa, ultimo: ultimoPlato });
        } else {
            res.status(404).json({ error: 'Mesa no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la mesa' });
    }
});

app.get('/login', (req, res) => {
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
                let plato = await Plato.findOne({ _id: pedido.plato });
                if (plato) {
                    plato.cantidad = pedido.cantidad;
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

app.get('/login/admin/mesas', async (req, res) => {
    try {
        let mesas = await Mesa.find({});
        if (mesas) {
            res.render('mesas', { lmesa: mesas });
        } else {
            console.log('No se encontraron mesas.');
            res.render('mesas', { lmesa: null });
        }
    } catch (error) {
        console.log('Error al buscar las mesas:', error);
        res.render('mesas', { lmesa: null });
    }
});

app.get('/login/admin/recibidos', async (req, res) => {
    let platos = {};
    let precio = {};
    try {
        let mesas = await Mesa.find({});
        for (let mesa of mesas) {
            platos[mesa.numero] = [];
            precio[mesa.numero]= 0;
            for (let pedido of mesa.recibidos) {
                let plato = await Plato.findOne({ _id: pedido.plato });
                if (plato) {
                    plato.cantidad = pedido.cantidad;
                    platos[mesa.numero].push(plato);
                    precio[mesa.numero]+= plato.precio*pedido.cantidad;
                }
            }
        }
        if (mesas) {
            res.render('recibidos', { lmesa: mesas, lplato: platos, Mprecio:precio });
        } else {
            console.log('No se encontraron mesas.');
            res.render('recibidos', { lmesa: null, lplato: platos, Mprecio:precio });
        }
    } catch (error) {
        console.log('Error al buscar las mesas:', error);
        res.render('recibidos', { lmesa: null, lplato: platos, Mprecio:precio });
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
                    .then(() => {
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
    .then(() => {
        res.json({ redirectUrl: '/login/admin' });
    })
    .catch(err => {
        console.log('Error al guardar el plato:', err);
    });
});

app.post('/recibir-plato', async (req, res) => {
    let ob = req.body;
    try {
        let mesa = await Mesa.findOne({numero:ob.numeroMesa});
        if (mesa) {
            for (let i = 0; i < mesa.pedidos.length; i++) {
                let plato = await Plato.findOne({ _id: mesa.pedidos[i].plato });
                if (plato.numero == ob.numeroPlato) {
                    if (mesa.recibidos.findIndex(item => item.plato.equals(plato._id)) >= 0) {
                        let posicionPlato = mesa.recibidos.findIndex(item => item.plato.equals(plato._id));
                        mesa.recibidos[posicionPlato].cantidad += 1;
                        mesa.pedidos[i].cantidad -= 1;
                    }else{
                        mesa.recibidos.push({plato: mesa.pedidos[i].plato, cantidad: 1});
                        mesa.pedidos[i].cantidad -= 1;
                    }
                    if (mesa.pedidos[i].cantidad == 0) {
                        mesa.pedidos.splice(i,1);
                    }
                    mesa.save()
                        .then(() => {
                            console.log('Plato editado');
                        })
                        .catch(error => {
                            console.log('Error al editar el plato:', error);
                        });
                }
            }
            res.json({ redirectUrl: '/login/admin/pendientes' });
        } else {
            console.log('No se encontraron mesas.');
            res.json({ redirectUrl: '/login/admin/pendientes' });
        }
    } catch (error) {
        console.log('Error al buscar las mesas:', error);
        res.json({ redirectUrl: '/login/admin/pendientes' });
    }

});

app.post('/add-mesa', async (req, res) => {
    let ob = req.body;
    let mesa = await Mesa.findOne({numero:ob.numero});
    if (!mesa) {
        const anhadirMesa = new Mesa({
            numero: ob.numero,
            personas: ob.personas,
            pedidos: [],
            recibidos: []
        });
        
        anhadirMesa.save()
        .then(() => {
            res.json({ redirectUrl: '/login/admin/mesas' });
        })
        .catch(err => {
            console.log('Error al guardar la mesa:', err);
        });
    }
});

app.post('/pedir-platos', async (req, res) => {
    let ob = req.body;
    let mesa = await Mesa.findOne({numero: ob.mesa});
    for (let plato of ob.platos) {
        let bPlato = await Plato.findOne({numero : plato.numero})
        if (mesa.pedidos.findIndex(item => item.plato.equals(bPlato._id)) >= 0) {
            let posicionPlato = mesa.pedidos.findIndex(item => item.plato.equals(bPlato._id));
            mesa.pedidos[posicionPlato].cantidad += 1;
        }else{
            mesa.pedidos.push({plato: bPlato._id, cantidad: plato.cantidad});
        }
    }
    await mesa.save();
});

app.post('/pagar', async (req, res) =>{
    let ob = req.body;
    let mesa = await Mesa.findOne({numero : ob.numeroMesa});
    mesa.deleteOne()
    .then(() => {
        res.json({ redirectUrl: '/login/admin/recibidos' });
    })
    .catch(err => {
        console.log('Error al eliminar el plato:', err);
    });
});

app.listen(process.env.PORT, () => {
    console.log("__Servidor levantado.__");
});
