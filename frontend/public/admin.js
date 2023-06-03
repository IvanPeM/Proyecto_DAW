"use strict";

/**
 * Jquey para el submit del formulario para editar algún plato
 */
$('#fEditarEliminar').submit((e) => {
    e.preventDefault();
    let numero = $('#numero').val();
    let nombre = $('#nombre').val();
    let precio = $('#precio').val();
    let foto = $('#foto').val();
    let ingredientes = $('#ingrediente').val();
    /**
     * Enviar todo al POST con toda la informacion
     */
    $.post("http://127.0.0.1:3000/editar-plato", {numero:numero, nombre: nombre, precio: precio, foto:foto, ingredientes:ingredientes }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
});

/**
 * Jquery del formulario para crear un nuevo plato.
 */
$('#fNuevo').submit((e) => { 
    e.preventDefault();
    let nombre = $('#nombre').val();
    let precio = $('#precio').val();
    let foto = $('#foto').prop('files')[0].name;
    let ingredientes = $('#ingredientes').val();
    /**
     * Enviar todo al POST con toda la informacion para para crear un nuevo plato
     */
    $.post("http://127.0.0.1:3000/add-plato", { nombre: nombre, precio: precio, foto:foto, ingredientes:ingredientes }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
});

/**
 * Jquey al ser pulsado el boton de nuevo que se muestre el formulario para hacer un nuevo plato
 */
$('#bNuevo').click( (e) => {
    e.preventDefault();
    let contenido = '<div class="col-auto">';
    contenido += '<input type="text" class="form-control" id="nombre" placeholder="Escribe el nombre" name="nombre"></div>';
    contenido += '<div class="col-auto">';
    contenido += '<input type="number" class="form-control" id="precio" placeholder="Escribe el precio" name="precio"></div>';
    contenido += '<div class="col-auto">';
    contenido += '<input type="file" class="form-control" id="foto" placeholder="Adjunto la foto" name="foto"></div>';
    contenido += '<div class="col-auto">';
    contenido += '<input type="text" class="form-control" id="ingredientes" placeholder="Escribe los ingredientes" name="ingredientes"></div>';
    contenido += '<div class="col-auto">';
    contenido += `<input type="submit" class="btn btn-success" name="Editar" value="Aceptar"></div>`;
    $('#fNuevo').append(contenido);
    $('#bNuevo').prop('disabled', true);
});

/**
 * Funcion para el botón de editar que me muestre el formulario para editar plato
 * @param {Number} numero numero del plato
 * @param {String} nombre nombre del plato
 * @param {Number} precio precio del plato
 * @param {String} foto foto del plato
 * @param {String} ingredientes ingredientes del plato
 */
function editar(numero, nombre, precio, foto, ingredientes){
    let tdNumero = document.getElementById(`${numero}numero`);
    let td = document.getElementById(`${numero}nombre`);
    let td1 = document.getElementById(`${numero}precio`);
    let td2 = document.getElementById(`${numero}foto`);
    let td3 = document.getElementById(`${numero}ingredientes`);
    let td4 = document.getElementById(`${numero}editar`);

    //En cada td existente se le añade los inputs para que puedas modificar.
    tdNumero.innerHTML = `<input type="text" id="numero" class="form-control bg-black text-white border-0" name="numero" value="${numero}" readonly="readonly">`;
    td.innerHTML = `<textarea type="text" id="nombre" name="nombre">${nombre}</textarea>`;
    td1.innerHTML = `<input type="number" id="precio" class="form-control" name="precio" value="${precio}">`;
    td2.innerHTML = `<input type="text" id="foto" class="form-control" name="foto" value="${foto}">`;
    td3.innerHTML = `<textarea type="text" id="ingrediente" name="ingredientes">${ingredientes}</textarea>`;
    td4.innerHTML = `<input type="submit" class="btn btn-success" name="Editar" value="Aceptar">`;
}

/**
 * Funcion para eliminar el plato pulsado
 * @param {Number} numero numero del plato
 */
function eliminar(numero){
    $.post("http://127.0.0.1:3000/eliminar-plato", { numero: numero }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
}