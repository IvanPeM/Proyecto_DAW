"use strict";

function recibido(mesa,numero){
    $.post("http://127.0.0.1:3000/recibir-plato", { numeroPlato: numero, numeroMesa:mesa }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
}