"use strict";

let dinero = 0;

function pedir(ultimo,mesa){
    let lplatos = [];
    for (let i = ultimo; i > 0; i--) {
        lplatos.push({cantidad: document.getElementById(`plato${i}`).value, numero : i});
        document.getElementById(`plato${i}`).value = 0;
    }
    let pedir = document.getElementById(`pedir`);
    pedir.innerHTML = `Pedir`;
    dinero = 0;
    $.post("http://127.0.0.1:3000/pedir-platos", { platos: lplatos, mesa: mesa }, (data) => {
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