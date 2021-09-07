import express = require('express');

export default class Server{
    public app : express.Application;
    private port : number;

    constructor(port:number){
        this.port = port;
        this.app = express();
    }

    start(callback:Function){
        this.app.listen(this.port, callback())
    }

    static init(port:number):Server{
        return new Server(port);
    }
}


const server = Server.init(8080);

server.start(()=>{console.log('Servidor escuchando en el puerto 8080')});