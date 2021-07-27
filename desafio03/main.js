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
//