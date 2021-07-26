async function operation(a:number, op:string, b:number){

    switch(op){
        case '+':
            let operationA = await import('./suma');
            let sumar = new operationA.suma(a, b);
            return sumar.show();
        case '-':
            let operationB = await import ('./resta')
            let restar = new operationB.resta(a, b);
            return restar.show();
    }
}

operation(5, '+', 7).then(e=>console.log(e));

operation(12, '-', 3).then(e=>console.log(e));