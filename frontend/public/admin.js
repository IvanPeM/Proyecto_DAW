"use strict";

$('#fEditarEliminar').submit((e) => { 
    e.preventDefault();
    let numero = $('#numero').val();
    let nombre = $('#nombre').val();
    let precio = $('#precio').val();
    let foto = $('#foto').val();
    let ingredientes = $('#ingrediente').val();
    $.post("http://127.0.0.1:3000/editar-plato", {numero:numero, nombre: nombre, precio: precio, foto:foto, ingredientes:ingredientes }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
});

$('#fNuevo').submit((e) => { 
    e.preventDefault();
    let nombre = $('#nombre').val();
    let precio = $('#precio').val();
    let foto = $('#foto').prop('files')[0].name;
    let ingredientes = $('#ingredientes').val();
    console.log(foto);
    $.post("http://127.0.0.1:3000/add-plato", { nombre: nombre, precio: precio, foto:foto, ingredientes:ingredientes }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
});

$('#bNuevo').click( (e) => {
    e.preventDefault();
    // let contenido = '<form class="row g-3 mx-auto my-3" id="fNuevo">';
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
    // contenido += '</form>';
    $('#fNuevo').append(contenido);
});

function editar(numero, nombre, precio, foto, ingredientes){
    let tdNumero = document.getElementById(`${numero}numero`);
    let td = document.getElementById(`${numero}nombre`);
    let td1 = document.getElementById(`${numero}precio`);
    let td2 = document.getElementById(`${numero}foto`);
    let td3 = document.getElementById(`${numero}ingredientes`);
    let td4 = document.getElementById(`${numero}editar`);

    //En cada td existente se le añade los inputs para que puedas modificar.
    tdNumero.innerHTML = `<input type="text" id="numero" name="numero" value="${numero}" readonly="readonly">`;
    td.innerHTML = `<input type="text" id="nombre" name="nombre" value="${nombre}">`;
    td1.innerHTML = `<input type="number" id="precio" name="precio" value="${precio}">`;
    td2.innerHTML = `<input type="text" id="foto" name="foto" value="${foto}">`;
    td3.innerHTML = `<input type="text" id="ingrediente" name="ingredientes" value="${ingredientes}">`;
    td4.innerHTML = `<input type="submit" class="btn btn-success" name="Editar" value="Aceptar">`;
}

function eliminar(numero){
    $.post("http://127.0.0.1:3000/eliminar-plato", { numero: numero }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
}