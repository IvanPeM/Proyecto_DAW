"use strict";

$('form').submit((e) => { 
    e.preventDefault();
    let nombre = $('#nombre').val();
    let pass = $('#pass').val();
    $.post("http://127.0.0.1:3000/login", { nombre: nombre, pass: pass }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
});