"use strict";

let dinero = 0;

/**
 * Funcion que al pulsar el botón se pida todos los platos
 * @param {Number} ultimo ultimo plato
 * @param {Number} mesa numero de la mesa
 */
function pedir(ultimo,mesa){
    let lplatos = [];
    for (let i = ultimo; i > 0; i--) {
        //Si en input con este id que no sea 0 entra
        if(document.getElementById(`plato${i}`).value != 0){
            //Añado el plato y pongo a 0 en input
            lplatos.push({cantidad: document.getElementById(`plato${i}`).value, numero : i});
            document.getElementById(`plato${i}`).value = 0;
        }
    }
    let pedir = document.getElementById(`pedir`);
    pedir.innerHTML = `Pedir`;
    dinero = 0;
    /**
     * POST para pedir los platos a la mesa correcta
     */
    $.post("http://127.0.0.1:3000/pedir-platos", { platos: lplatos, mesa: mesa }, (data) => {
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            console.log('No se encontró el usuario.');
        }
    });
}

/**
 * Funcion para editar el boton y que indique el precio del pedido
 * @param {Number} numero 
 */
function menos(numero){
    //Si existe este id
    if(document.getElementById(`precio${numero}`)){
        let precio = document.getElementById(`precio${numero}`);
        let valor = parseInt(precio.innerText);
        //Si el input del plato no es 0
        if(document.getElementById(`plato${numero}`).value != 0){
            //Si el dinero no es 0
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

/**
 * Funcion para editar el boton y que indique el precio del pedido
 * @param {Number} numero 
 */
function mas(numero){
    //Si exite este id
    if(document.getElementById(`precio${numero}`)){
        //Sumar el precio del plato al boton
        let precio = document.getElementById(`precio${numero}`);
        let valor = parseInt(precio.innerText);
        dinero += valor;
        let pedir = document.getElementById(`pedir`);
        pedir.innerHTML = `Pedir ${dinero}€`;
    }
}