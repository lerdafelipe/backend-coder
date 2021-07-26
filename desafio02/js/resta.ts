export class resta{
    
    private resultado:number=0
    constructor(a:number, b:number){
        this.resultado = a - b;
    }

    public show(){
        return this.resultado;
    }
}