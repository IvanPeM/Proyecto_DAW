"use strict";

/**
 * Funcion para cuando se pulsa el boton de pagar
 * @param {Number} mesa 
 */
function pagar(mesa){
    $.post("http://127.0.0.1:3000/pagar", { numeroMesa:mesa }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
}