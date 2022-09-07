/**@type {HTMLCanvasElement} */
const can = document.getElementById("can");
const ctx = can.getContext("2d");

function update(){
    requestAnimationFrame(update());
    
}