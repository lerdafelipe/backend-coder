const fs = require('fs');

//Leer Archivo sincronicamente(ubicación del archivo, tipo de lectura, callback de control)
fs.readFile('./text.txt', 'utf-8', (error, contenido)=>{
    if(error){
        console.log('error');
    }else{
        console.log(contenido);
    }
});
//Escribir, crear un archivo nuevo sincronicamente. (Ruta del archivo, Texto en el archivo, callback de control)
fs.writeFile('./text2.txt', 'Hola mi nombre es Felipe', error=>{
    if(error){
        console.log('error');
    }else{
        console.log('Guardado')
    }
});
//Sobre escribir un archivo de forma sincronica (el archivo a sobre escribir, la nueva información, callback de control)
fs.appendFile('./text2.txt', 'Agregando más información',error=>{
    if(error){
        console.log('error');
    }else{
        console.log('Nuevo Guardado')
    }
});
//Para borrar un archivo sincronicamente. Primer parametro es de la ruta que queremos borrar y segundo el callback
//fs.unlink('./texto-a-borrar.txt', error=>{
//    if(error){
//        console.log('Error');
//    }else{
//        console.log('Eliminado')
//    }
//});

//para crear una nueva carpeta usamos fs.mkdir('Nombre de la carpeta y ruta', callback)


//fs.readdir('ruta', callback())  ==> Esto permite leer el contenido  de una carpeta.