const socket = io();
const title = document.getElementById('title');
const price = document.getElementById('price');
const thumbnail = document.getElementById('thumbnail');
const btn = document.getElementById('enviar');
let productos = [];


socket.on('productos', data=>{
    productos = data;
    console.log(productos);
})

btn.addEventListener('click', ()=>{
    socket.emit('producto', {title: title.value, price: price.value, thumbnail: thumbnail.value});
});
