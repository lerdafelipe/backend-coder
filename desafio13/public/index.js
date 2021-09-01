const socket = io.connect();
const title = document.getElementById('title');
const price = document.getElementById('price');
const thumbnail = document.getElementById('thumbnail');
const text = document.getElementById('text');
const author = document.getElementById('author');
const btn = document.getElementById('enviar');
const btnMsg = document.getElementById('enviarMsg');
const innerProducts = document.getElementById('renderProducts');
const innerMessages = document.getElementById('messages');


socket.on('productos', data=>{
    renderProducts(data);
});

const renderProducts = (data)=>{
    const datos = data.productos;
    let fragment = datos.map((product)=>{
            return (`<tr>
                        <td>${product.title}</td>
                        <td>${product.price}</td>
                        <td>${product.thumbnail}</td>
                    </tr>
                    `)
            }).join(' ');
    if(datos.length === 0){
        innerProducts.innerHTML = `<tr><td></td><td>No se han encontrado productos</td><td></td></tr>`
    }else{
        innerProducts.innerHTML = fragment;
    }
}

socket.on('messages', (data)=>{
    renderMsg(data);
})

const renderMsg = (data)=>{
    const datos = data.messages;
    let html = datos.map((message)=>{
        return (`<div>
                    <strong style="color: blue; font-weight: 600;">${message.author}</strong>
                    <span style="color: #804000;">[${message.fyh}]:</span>
                    <em style="color:#00ff00; font-style:italic;">${message.text}</em>
                </div>
                `)
    }).join(' ');

    innerMessages.innerHTML = html;

    //Vaciar contenido
    text.value = '';
}



btn.addEventListener('click', ()=>{
    socket.emit('producto', {title: title.value, price: price.value, thumbnail: thumbnail.value});
});


btnMsg.addEventListener('click', ()=>{
    const f = new Date();
    socket.emit('message', {author: author.value, fyh: `${f.getDate()}/${f.getMonth()+1}/${f.getFullYear()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`, text: text.value});
});

