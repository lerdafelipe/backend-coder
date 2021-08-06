function random (min, max){
    return Math.floor(Math.random () * (max-min)) + min;
}


for(let i=1; i<10;i++){
    let num = random(1, 20);
    console.log(i, ": ", num);
}
