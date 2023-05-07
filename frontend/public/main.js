"use strict";

$(document).ready(() => {
    console.log("Web cargada.");
    getTablero();
});

function getTablero() {
    $.get("http://localhost:3000/tablero", (data, status) => {
        // console.log("data : ", data);
        // console.log("status : ", status);
        impresora(data);
    })
}

function pulsa(x, y) {
    $.post("http://127.0.0.1:3000/colocaFicha", { x: x, y: y }, (data) => {
        const reloadUsingLocationHash = () => {
            window.location.hash = "reload";
        }
        window.onload = reloadUsingLocationHash();
    });
}