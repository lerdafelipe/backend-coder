const http = require('http');

function random (min, max){
    return Math.floor(Math.random () * (max-min)) + min;
}

http.createServer((req, res)=>{
    const {url , method} = req;

    let id = random(1, 10)
    let title = "Producto " + random(1, 10);
    let price = ((Math.random () * (9999.99-0.00)) + 0.00).toFixed(2);
    let thumbnail = "Foto " + random(1, 10);

    let requerimiento = {id, title, price, thumbnail}

    res.end(JSON.stringify(requerimiento));

}).listen(6800,function(){
    console.log(this.address().port)
});