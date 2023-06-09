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
app.use(express.static(path.join(__dirname, '../frontend/public')));

/**
 * Ruta raíz en GET
 */
app.get('/', async (req, res) => {

    res.sendFile(path.join(__dirname, '../frontend/src/home.html'));
    
});

/**
 * Ruta raíz en GET
 */
app.get('/menu', async (req, res) => {

    try {
        //buscar todos los platos
        let platos = await Plato.find({});
        if (platos) { //Si existen
            //Renderiza el index.handlebars y envio todos los platos
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

/**
 * Ruta de la mesa con el _id de la mesa en GET
 */
app.get('/mesa/:id', async (req, res) => {
    //El :id
    const mesaId = req.params.id;
    
    try {
        //Buscar la mesa con el id de la URL
        const mesa = await Mesa.findOne({ _id: mesaId });
        //Busca el último plato creado
        let ultimoPlato = await Plato.findOne().sort({ createdAt: -1 });
        //Buscar todos los platos
        let platos = await Plato.find({});
        if (mesa) {//Si existe la mesa
            //Renderiza el menu.handlebars y envio los platos, la mesa y el último plato
            res.render('menu', { lcarta: platos, mesa: mesa, ultimo: ultimoPlato });
        } else {
            res.status(404).json({ error: 'Mesa no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la mesa' });
    }
});

/**
 * Ruta /login en GET
 */
app.get('/login', (req, res) => {
    //Renderiza el login.html
    res.sendFile(path.join(__dirname, '../frontend/src/login.html'));
});

/**
 * Ruta /login/admin en GET
 */
app.get('/login/admin', async (req, res) => {
    try {
        //Buscar todos los Platos
        let platos = await Plato.find({});
        if (platos) { //Si exite algún plato
            //Renderizar admin y enviar los platos
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

/**
 * Ruta /login/admin/pendientes en GET
 */
app.get('/login/admin/pendientes', async (req, res) => {
    let platos = {};
    try {
        //Buscar todas las mesas
        let mesas = await Mesa.find({});
        for (let mesa of mesas) { //Recorrer las mesas
            platos[mesa.numero] = [];
            for (let pedido of mesa.pedidos) { //Recorrer los pedidos
                //Buscar el plato por su _id
                let plato = await Plato.findOne({ _id: pedido.plato });
                if (plato) { //Si exite
                    //Añado .cantidad al plato y lo añado al plato
                    plato.cantidad = pedido.cantidad;
                    platos[mesa.numero].push(plato);
                }
            }
        }
        if (mesas) { //Si exite
            //Renderizar pedidos y enviar las mesas y los platos
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

/**
 * Ruta /login/admin/mesas en GET
 */
app.get('/login/admin/mesas', async (req, res) => {
    try {
        //Busar todas las Mesas
        let mesas = await Mesa.find({});
        if (mesas) { //Si existe
            //Renderizar mesas y enviar las mesas
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

/**
 * Ruta /login/admin/recibidos en GET
 */
app.get('/login/admin/recibidos', async (req, res) => {
    let platos = {};
    let precio = {};
    try {
        //Buscar todas las Mesas
        let mesas = await Mesa.find({});
        for (let mesa of mesas) { //Recorrer las mesas
            platos[mesa.numero] = [];
            precio[mesa.numero]= 0;
            for (let pedido of mesa.recibidos) { //Recorrer los recibidos
                //Buscar el Plato por su _id
                let plato = await Plato.findOne({ _id: pedido.plato });
                if (plato) { //Si exite
                    //Añado .cantidad al plato y lo añado al plato
                    plato.cantidad = pedido.cantidad;
                    platos[mesa.numero].push(plato);
                    precio[mesa.numero]+= plato.precio*pedido.cantidad;
                }
            }
        }
        if (mesas) { //Si existe
            //Renderizar recibidos y enviar las mesas, los platos y los precios
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


/**
 * Ruta /login en POST
 * Loguear para entrar a la zona administrador
 */
app.post('/login', async (req, res) => {
    let ob = req.body;
    //Buscar el Usuario con el nombre y la pass que has puesto en el login
    let usuario = await Usuario.findOne({ nombre: ob.nombre, pass: ob.pass });
    if (usuario) { //Si existe
        //Renderizar /login/admin
        res.json({ redirectUrl: '/login/admin' });
    } else {
        console.log('No se encontró el usuario.');
    }
});

/**
 * Ruta /editar-plato en POST
 * Edito para modificar la información del plato
 */
app.post('/editar-plato', async (req, res) => {
    let ob = req.body;
    //Buscar el Plato por su número
    Plato.findOne({ numero: ob.numero })
        .then(plato => {
            if (plato) { //Si existe
                plato.nombre = ob.nombre;
                plato.precio = ob.precio;
                plato.foto = ob.foto;
                plato.ingredientes = ob.ingredientes;

                return plato.save()
                    .then(() => {
                        //Renderizar /login/admin
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

/**
 * Ruta /eliminar-plato en POST
 * Eliminar el plato que ya existe
 */
app.post('/eliminar-plato', async (req, res) => {
    let ob = req.body;
    //Buscar el plato por su número
    Plato.findOne({ numero: ob.numero })
        .then(plato => {
            if (plato) { //Si existe
                return plato.deleteOne()
                    .then(() => {
                        //Renderizar /login/admin
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

/**
 * Ruta /add-plato en POST
 * Crear un nuevo plato
 */
app.post('/add-plato', async (req, res) => {
    let ob = req.body;
    //Buscar el último plato para saber el número
    const ultimoPlato = await Plato.findOne().sort({ createdAt: -1 });
    let numero = 0;
    if(ultimoPlato == null){ //Si no tengo platos
        numero = 1;
    }else{
        numero = ultimoPlato.numero + 1;
    }
    const anhadirPlato = new Plato({
        nombre: ob.nombre,
        numero: numero,
        foto: ob.foto,
        precio: ob.precio,
        ingredientes: ob.ingredientes
    });
    anhadirPlato.save()
    .then(() => {
        //Renderizar /login/admin
        res.json({ redirectUrl: '/login/admin' });
    })
    .catch(err => {
        console.log('Error al guardar el plato:', err);
    });
});

/**
 * Ruta /recibir-plato en POST
 * Para los platos que ha pedido el cliente y ponerlo que ya está recibido
 */
app.post('/recibir-plato', async (req, res) => {
    let ob = req.body;
    try {
        //Buscar por el número de mesa
        let mesa = await Mesa.findOne({numero:ob.numeroMesa});
        if (mesa) { //Si existe
            for (let i = 0; i < mesa.pedidos.length; i++) { //Recorrer los platos pedidos
                //Buscar el plato por su _id
                let plato = await Plato.findOne({ _id: mesa.pedidos[i].plato });
                if (plato.numero == ob.numeroPlato) {
                    //Si eixste el plato en los recibidos
                    if (mesa.recibidos.findIndex(item => item.plato.equals(plato._id)) >= 0) {
                        //Sumo un plato para los que están recibidos y quito un plato para los pedidos
                        let posicionPlato = mesa.recibidos.findIndex(item => item.plato.equals(plato._id));
                        mesa.recibidos[posicionPlato].cantidad += 1;
                        mesa.pedidos[i].cantidad -= 1;
                    }else{
                        //Si no existe lo añade a recibidos y quita un plato para los pedidos
                        mesa.recibidos.push({plato: mesa.pedidos[i].plato, cantidad: 1});
                        mesa.pedidos[i].cantidad -= 1;
                    }
                    //Si en pedidos el plato no tiene ninguna
                    if (mesa.pedidos[i].cantidad == 0) {
                        //Se elimina el plato en pedidos
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
            //Renderizar los platos pendientes
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

/**
 * Ruta /add-mesa en POST
 * Crear una nueva mesa
 */
app.post('/add-mesa', async (req, res) => {
    let ob = req.body;
    //Buscar si existe la mesa ya creada
    let mesa = await Mesa.findOne({numero:ob.numero});
    if (!mesa) { //Si no existe
        //Crear la mesa
        const anhadirMesa = new Mesa({
            numero: ob.numero,
            personas: ob.personas,
            pedidos: [],
            recibidos: []
        });
        
        anhadirMesa.save()
        .then(() => {
            //Renderizar las mesas
            res.json({ redirectUrl: '/login/admin/mesas' });
        })
        .catch(err => {
            console.log('Error al guardar la mesa:', err);
        });
    }
});

/**
 * Ruta pedir-plato en POST
 * Para pedir los platos y añadirlo a pedidos
 */
app.post('/pedir-platos', async (req, res) => {
    let ob = req.body;
    //Buscar la mesa que está pidiendo
    let mesa = await Mesa.findOne({numero: ob.mesa});
    for (let plato of ob.platos) { //Recorrer los platos que ha pedido el cliente
        //Buscar el plato por su numero
        let bPlato = await Plato.findOne({numero : plato.numero})
        //Si existe el plato en pedidos
        if (mesa.pedidos.findIndex(item => item.plato.equals(bPlato._id)) >= 0) {
            //Sumo a la cantidad que ya estaba pedido antes
            let posicionPlato = mesa.pedidos.findIndex(item => item.plato.equals(bPlato._id));
            mesa.pedidos[posicionPlato].cantidad += plato.cantidad;
        }else{
            mesa.pedidos.push({plato: bPlato._id, cantidad: plato.cantidad});
        }
    }
    await mesa.save();
});

/**
 * Ruta /pagar en POST
 * Eliminar la mesa que ya está pagada
 */
app.post('/pagar', async (req, res) =>{
    let ob = req.body;
    //Buscar la mesa que quiere pagar
    let mesa = await Mesa.findOne({numero : ob.numeroMesa});
    mesa.deleteOne()
    .then(() => {
        res.json({ redirectUrl: '/login/admin/recibidos' });
    })
    .catch(err => {
        console.log('Error al eliminar el plato:', err);
    });
});

/**
 * Encender el server desde el puesto enviado del .env
 */
app.listen(process.env.PORT, () => {
    console.log("__Servidor levantado.__");
});
