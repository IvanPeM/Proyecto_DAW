"use strict";

let dinero = 0;

function pedir(ultimo){
    let platos = {};
    for (let i = ultimo; i > 0; i--) {
        platos[i] = document.getElementById(`plato${i}`).value
    }
    console.log(platos);
    let pedir = document.getElementById(`pedir`);
    pedir.innerHTML = `Pedir`;
    $.post("http://127.0.0.1:3000/pedir-plato", { platos: platos }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
}

function menos(numero){
    if(document.getElementById(`precio${numero}`)){
        let precio = document.getElementById(`precio${numero}`);
        let valor = parseInt(precio.innerText);
        if(document.getElementById(`plato${numero}`).value != 0){
            if(dinero != 0){
                dinero -= valor;
                let pedir = document.getElementById(`pedir`);
                if(dinero == 0){
                    pedir.innerHTML = `Pedir`;
                }else{
                    pedir.innerHTML = `Pedir ${dinero}€`;
                }
            }
        }
    }
}

function mas(numero){
    if(document.getElementById(`precio${numero}`)){
        let precio = document.getElementById(`precio${numero}`);
        let valor = parseInt(precio.innerText);
        dinero += valor;
        let pedir = document.getElementById(`pedir`);
        pedir.innerHTML = `Pedir ${dinero}€`;
    }
}