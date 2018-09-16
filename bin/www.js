'use strict';

const app = require('../app');
const http = require('http');
const { MICRO_SERVER_PORT } = require('../config');


let server;
let port = normalizePort(MICRO_SERVER_PORT);

function start(_port) {
    if (_port !== undefined) {
        port = _port;
    }

    app.set('port', port);

    server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    return { server, app };
}

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const serverAddress = server.address();
    const bind = typeof serverAddress === 'string'
        ? 'pipe ' + serverAddress
        : 'port ' + serverAddress.port;
    console.log('Listening on ' + bind);
}

if (!module.parent) {
    start();
}

module.exports = start;