"use strict";

/**
 * Jquey del formulario par crear una nueva mesa
 */
$('#fNuevo').submit((e) => { 
    e.preventDefault();
    let numero = $('#numero').val();
    let personas = $('#personas').val();
    /**
     * Enviarlo a POST con toda la informacion de la nueva mesa
     */
    $.post("http://127.0.0.1:3000/add-mesa", { numero: numero, personas: personas }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
});

/**
 * Jquery que al pulsar el boton de la nueva mesa y despliega el formulario para crear una nueva mesa
 */
$('#bNuevo').click( (e) => {
    e.preventDefault();
    let contenido = '<div class="col-auto">';
    contenido += '<input type="number" class="form-control" id="numero" placeholder="Numero de mesa" name="numero"></div>';
    contenido += '<div class="col-auto">';
    contenido += '<input type="number" class="form-control" id="personas" placeholder="Cuantas personas son" name="personas"></div>';
    contenido += '<div class="col-auto">';
    contenido += `<input type="submit" class="btn btn-success" name="Editar" value="Aceptar"></div>`;
    $('#fNuevo').append(contenido);
    $('#bNuevo').prop('disabled', true);
});