"use strict";

let dinero = 0;

function pedir(ultimo){
    let platos = {};
    for (let i = ultimo; i > 0; i--) {
        platos[i] = document.getElementById(`plato${i}`).value
    }
    console.log(platos);
}

function menos(numero){
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

function mas(numero){
    let precio = document.getElementById(`precio${numero}`);
    let valor = parseInt(precio.innerText);
    dinero += valor;
    let pedir = document.getElementById(`pedir`);
    pedir.innerHTML = `Pedir ${dinero}€`;
}