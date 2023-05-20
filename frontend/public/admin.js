"use strict";

$('#fEditarEliminar').submit((e) => { 
    e.preventDefault();
    let nombre = $('#nombre').val();
    let precio = $('#precio').val();
    let foto = $('#foto').val();
    let ingredientes = $('#ingrediente').val();
    $.post("http://127.0.0.1:3000/editar-plato", { nombre: nombre, precio: precio, foto:foto, ingredientes:ingredientes }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
});

$('#bNuevo').click( (e) => { 
    e.preventDefault();
    let contenido = '<form class="form-inline" id="fNuevo">';
    contenido += '<input type="text" class="form-control" id="nombre" placeholder="Escribe el nombre" name="nombre">';
    contenido += '<input type="number" class="form-control" id="precio" placeholder="Escribe el precio" name="precio">';
    contenido += '<input type="file" class="form-control" id="foto" placeholder="Adjunto la foto" name="foto">';
    contenido += '<input type="text" class="form-control" id="ingredientes" placeholder="Escribe los ingredientes" name="ingredientes">';
    contenido += `<input type="submit" name="Editar" value="Aceptar">`;
    contenido += '</form>';
    $('#divNuevo').append(contenido);
});

function editar(numero, nombre, precio, foto, ingredientes){
    console.log(numero);
    let td = document.getElementById(`${numero}nombre`);
    let td1 = document.getElementById(`${numero}precio`);
    let td2 = document.getElementById(`${numero}foto`);
    let td3 = document.getElementById(`${numero}ingredientes`);
    let td4 = document.getElementById(`${numero}editar`);

    //En cada td existente se le añade los inputs para que puedas modificar.
    td.innerHTML = `<input type="text" id="nombre" name="nombre" value="${nombre}" readonly="readonly">`;
    td1.innerHTML = `<input type="number" id="precio" name="precio" value="${precio}">`;
    td2.innerHTML = `<input type="text" id="foto" name="foto" value="${foto}">`;
    td3.innerHTML = `<input type="text" id="ingrediente" name="ingredientes" value="${ingredientes}">`;
    td4.innerHTML = `<input type="submit" name="Editar" value="Aceptar">`;
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