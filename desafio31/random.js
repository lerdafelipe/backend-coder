function calc(canti){
    const numeros = [];
    function random (){
        return Math.floor(Math.random () * (1000-1)) + 1;
    }
    for (let index = 0; index < canti; index++) {
        let newNum = random();
        let num = {numero: newNum, cantidad: exist(newNum)};
        function exist(element){
            cantidad = numeros.filter(num => num.numero === element);
            return cantidad.length + 1;
        }
        numeros.push(num);
    }
    return numeros;
}

process.on('message', cant =>{
    const numeros = calc(cant);
    process.send(numeros);
})