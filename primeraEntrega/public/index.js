const btnAdd = document.getElementById('add');
const title = document.getElementById('title');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const description = document.getElementById('description');
const thumbnail = document.getElementById('thumbnail');
const btnChange = document.getElementById('change');
const titleNew = document.getElementById('titleNew');
const priceNew = document.getElementById('priceNew');
const descriptionNew = document.getElementById('descriptionNew');
const stockNew = document.getElementById('stockNew');
const thumbnailNew = document.getElementById('thumbnailNew');
const idChange = document.getElementById('idChange');
const innerProducts = document.getElementById('innerProducts');
const cart = document.getElementById('cart');
const f = Date.now();


//Render products cards in UI
const renderProducts = (data)=>{
    if(data.length > 0){
        let fragment = data.map(product=>{
            return(`
                <div class="card" style="width: 18rem; margin: 15px;">
                        <img src="${product.thumbnail}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <h5 class="card-title">$${product.price}</h5>
                        <button type="button" class="btn btn-primary" onclick="edit(${product.id})">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
                        <button type="button" class="btn btn-success" style="margin-top: 5px;" onclick="addCart(${product.id})">Agregar al carrito</button>
                        </div>
                    </div>
            `)
            }).join(' ');

        innerProducts.innerHTML = fragment;
    }else{
        innerProducts.innerHTML = "<p>No hay prductos cargados</p>";
    }

}


//Get products
function fetchProducts(){
    fetch('/productos')
        .then(data=>data.json())
        .then(datos => renderProducts(datos));
};

fetchProducts();
//Get products


//Send products to the server
btnAdd.addEventListener('click', ()=>{
    fetch('/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title.value, price: price.value, stock: stock.value, description: description.value, thumbnail: thumbnail.value, id: f})
      }).then(alert('Producto enviado'))
      .then(fetchProducts());
    price.value = '';
    title.value = '';
    thumbnail.value = '';
});



//Edit Products in the server
btnChange.addEventListener('click', ()=>{
    fetch(`/productos/${idChange.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: titleNew.value, price: priceNew.value, thumbnail: thumbnailNew.value})
      }).then(alert('Producto Modificado'))
      .then(fetchProducts());
    price.value = '';
    title.value = '';
    thumbnail.value = '';
});
//Edit products easiest UI
const innerEdit = (data)=>{
    titleNew.value = data[0].title;
    priceNew.value = data[0].price;
    thumbnailNew.value = data[0].thumbnail;
    descriptionNew.value = data[0].description;
    stockNew.value = data[0].stock;
    idChange.value = data[0].id;
}

const edit = (id)=>{
    fetch(`/productos/${id}`)
    .then(data=>data.json())
    .then(datos => innerEdit(datos));
}
//Edit products


//Delete the products of the server
const deleteProduct = (id)=>{
    fetch(`/productos/${id}`, {
        method: 'DELETE',
    }).then(alert('Producto eliminado'))
    .then(fetchProducts());
}


//Get products of the cart
function fetchCart(){
    fetch('/carrito')
        .then(data=>data.json())
        .then(datos => renderCart(datos));
}
//Render products in the UI
const renderCart = (data)=>{
    if(data.productosCart.length > 0){
        let innerCart = data.productosCart.map(product=>{
            return(`
            <li><p class="dropdown-item" href="#">${product.title}</p></li>
            `)
            }).join(' ');

        cart.innerHTML = innerCart;
    }else{
        cart.innerHTML = `<li><p class="dropdown-item" href="#">Carrito vacío</p></li>`;
    }
}
fetchCart();
//Get product cart


//Get products to send it to the cart
function addCart(id){
    fetch(`/productos/${id}`)
        .then(data=>data.json())
        .then(datos => sendCart(datos[0]));
}
//Send products to the cart
const sendCart = (data)=>{
    fetch('/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(alert('Producto Agregado'))
      .then(fetchCart());
}