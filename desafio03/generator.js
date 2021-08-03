function randomNum(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function* numRandom(min, max){
    let count = 0;

    while(true)
    yield{
        order: count++,
        numero: randomNum(min, max),
        fyh: new Date().toString()
    }
}

let generator = numRandom(30, 50);

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);