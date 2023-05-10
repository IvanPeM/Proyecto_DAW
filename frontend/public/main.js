"use strict";

$(document).ready(() => {
    getCarta();
});

function getCarta() {
    $.get("http://localhost:3000/", (data, status) => {
        carta(data);
    })
}

function carta(data){
    const cartaData = JSON.parse(data);
    console.log(cartaData);
}