//Servidor de Expres
const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require("./sockets");
//clase que inicia todo el sevior de express y configurar los sockets
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // https server
        this.server = http.createServer(this.app);

        //Configuraciónes de sockets
        //Configuración del socket server
        this.io = socketio(this.server, { /* configuraciones */});
    }

    middlewares() {
        //Desplegar el direorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        //Inicializar middlewares
        this.middlewares();

        //inicializar socket
        this.configurarSockets();

        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log("Server corriendo en puerto: ", this.port);
        });
    }
}

module.exports = Server;