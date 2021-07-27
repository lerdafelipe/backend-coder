const end = ()=>{console.log("Finalizó el proceso")}
const showWords = (e)=>{console.log(e)}

const returnar = (string, i, callback)=>{
    const arrayString = string.split(' ');

    if(arrayString.length == i){
        console.log('Palabras: ', arrayString.length);
        end();
        return;
    }

    setTimeout(()=>{
        callback(arrayString[i])
        returnar(string, i+1, callback)
    }, 1000)
}

returnar("Hola como estas", 0, showWords);
//Settimeout con un string, ese string es cortado en los espacios y forma un array, ese array, recorrerlo con forof consolenado  cada una y tener el numero de palabras para pasarlo a callback. RETURNAR=>(string, callback). CALLBACK(numero)=>Returnar un finalizó la operación, palabras: numero de palabra del sting.