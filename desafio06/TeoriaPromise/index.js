const fs = require('fs');

//Leer archivo usando promise
function leerTC(){
    fs.promises.readFile('ruta del archivo', 'utf-8')
    .then(contenido =>( console.log(contenido)))
    .catch(err=>(console.log('Error de lectura', err)));
}

//Leer usando async await

async function leerAA(){
    try{const contenido = await fs.promises.readFile('Ruta del archivo', 'utf-8');
    console.log(contenido)}
    catch{console.log('Error de lectura', err)}
} 
/////////////////////////////////////////
////////////////////////////////////////
///////////////////////////////////////
//Sobreescribir un archivo async await
async function add(){
    try{
        await fs.promises.appendFile('Ruta al archivo', 'Texto a agregar');
        console.log('Texto agregado');
    }
    catch{
        console.log('No pude escribir, hazlo de nuevo.')
    }
}

//Sobreescribir una archivo con promises
function addTC(){
    fs.promises.appendFile('Ruta al archivo', 'Texto a agregar')
    .then(contenido =>( console.log('Texto agregado')))
    .catch(err=>(console.log('No pude escribir, hazlo de nuevo.', err)));
}
/////////////////////////////////////////
////////////////////////////////////////
///////////////////////////////////////
//Escribir un archivo async await
async function write(){
    try{
        await fs.promises.writeFile('Ruta al archivo', 'Texto a escribir');
        console.log('Texto creado');
    }
    catch{
        console.log('No pude escribir, hazlo de nuevo.')
    }
}

//Escribir una archivo con promises
function escribirTC(){
    fs.promises.writeFile('Ruta al archivo', 'Texto a Escribir')
    .then(contenido =>( console.log('Texto creado')))
    .catch(err=>(console.log('No pude escribir, hazlo de nuevo.', err)));
}
/////////////////////////////////////////
////////////////////////////////////////
///////////////////////////////////////
//Renombrar archivo con async await
async function renameFile(){
    try{
        await fs.promises.rename('Ruta vieja del archivo', 'Ruta nueva del archivo');
        console.log('archivo renombrado');
    }
    catch{
        console.log('No pude renombrar')
    }
}
//Renombrar archivo con promises
function renameTC(){
    fs.promises.rename('Ruta al archivo vieja', 'Ruta nueva al archivo')
    .then(contenido =>( console.log('archivo renombrado')))
    .catch(err=>(console.log('No pude renombrar.', err)));
}