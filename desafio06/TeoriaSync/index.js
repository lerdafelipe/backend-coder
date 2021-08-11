const fs = require('fs');

//Leer Archivo sincronicamente(ubicación del archivo, tipo de lectura)
const txt = fs.readFileSync('./text.txt', 'utf-8');
//Escribir, crear un archivo nuevo sincronicamente. (Ruta del archivo, Texto en el archivo)
const write = fs.writeFileSync('./text2.txt', 'Hola mi nombre es Felipe');
//Sobre escribir un archivo de forma sincronica (el archivo a sobre escribir, la nueva información)
const rewrite = fs.appendFileSync('./text2.txt', 'Agregando más información');
//Para borrar un archivo sincronicamente. El parametro es de la ruta que queremos borrar
//const remove = fs.unlinkSync('./texto-a-borrar.txt');

//para crear una nueva carpeta usamos mkdirSync(Nombre de la carpeta y ruta)

//Manejo de errores en la lectura de archivos
// try{
//    console.log(fs.readFileSync('./fecha.txt', 'utf-8'));
//}catch{
//    console.log('error', error);
//}


console.log(txt);