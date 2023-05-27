"use strict";

function recibido(numero,mesa){
    $.post("http://127.0.0.1:3000/recibir-plato", { numeroPlato: parseInt(numero), numeroMesa:parseInt(mesa) }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
}