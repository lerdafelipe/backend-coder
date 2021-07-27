const end = ()=>{console.log("Finalizó el proceso")}
const showWords = (e)=>{console.log(e)}

const returnar = (string, callback, i, ms)=>{
    const arrayString = string.split(' ');

    if(ms == undefined){
        ms = 1000;
    }

    if(arrayString.length == i){
        console.log('Palabras: ', arrayString.length);
        end();
        return;
    }

    setTimeout(()=>{
        callback(arrayString[i]);
        returnar(string, callback, i+1, ms);
    }, ms)
}

returnar("Hola como estas", showWords, 0, 5550);
//