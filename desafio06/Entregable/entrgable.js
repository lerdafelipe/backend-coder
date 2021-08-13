const fs = require('fs');

class Archivo{
    constructor(file){
        this.file = file;
    }
    async guardar(product){
        if(fs.existsSync(`./${this.file}.txt`) === true){
            await fs.promises.appendFile(`./${this.file}.txt`, `, ${JSON.stringify(product, null, '\t')}`)
            .then(console.log('Nuevo producto agregado'))
            .catch('Error en agregar nuevo producto');
        }else{
            await fs.promises.writeFile(`./${this.file}.txt`, JSON.stringify(product, null, '\t'))
            .then(console.log('Archivo creado y elemento guardado'))
            .catch(console.log('Error al guardar'));
        }
        
    }
    leer(){
        fs.promises.readFile(`./${this.file}.txt`, 'utf-8')
        .then(contenido => console.log(contenido))
        .catch(console.log('Error al leer'));
    }
    borrar(){
        fs.promises.unlink(`./${this.file}.txt`)
        .then(console.log('Archivo borrado'))
        .catch(console.log('No se ha podido borrar el archivo'));
    }
}

let archivo = new Archivo('productos');
archivo.guardar({title: 'Perfume',price: 352,thumbnail: 'img/perfume'});
archivo.leer();
//archivo.borrar();