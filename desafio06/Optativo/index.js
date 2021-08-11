const fs = require('fs');

const fecha = new Date();
const createDate = fs.writeFileSync('./fecha.txt', JSON.stringify(fecha));

try{
    console.log(fs.readFileSync('./fecha.txt', 'utf-8'));
}catch{
    console.log('error', error);
}