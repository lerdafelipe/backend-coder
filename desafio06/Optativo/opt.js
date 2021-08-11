const fs = require('fs');
const json = require('../package.json');

let obj = {
    contenidoStr: '',
    contenidoObj:{},
    size:0
}


let data = fs.statSync('../package.json');
obj.contenidoStr = JSON.stringify(json, null, '\t');
obj.contenidoObj = json;
obj.size = `${data.size} Bytes`

/*fs.writeFileSync('./info.txt', JSON.stringify(obj, null, '\t'));
try{
    console.log('Hecho');
}catch{
    console.log('error');
}*/

const txt = fs.readFileSync('./info.txt', 'utf-8');
console.log(txt);