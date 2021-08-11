const fs = require('fs');

class Archivo{
    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    writeFile(){
        const product = {title: this.title, price: this.price, thumbnail: this.thumbnail};
        fs.writeFile('./productos.txt', JSON.stringify(product, null, '\t'), (err)=>{
            if(err){console.log('Error en guardar archivo')}
            else{console.log('archivo guardado')}
        });
    }
    readFile(){
        fs.readFile('./productos.txt', 'utf-8', (err, data)=>{
            if(err){console.log('No se pudo leer el archivo')}
            else{console.log(data)}
        });
    }
    deleteFile(){
        fs.unlink('./productos.txt', (err)=>{
            if(err){console.log('No se pudo eliminar')}
            else{console.log('Eliminado')}
        })
    }
}

let product = new Archivo('Perfume', 325, 'img/perfume');
product.writeFile();
product.readFile();
product.deleteFile();