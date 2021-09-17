const http =require('http');
const os = require('os');
const consola = require('consola');

const app = require('../app');
const { tryUsePort } =require('./find-port')

/**
 * Get port from 3000, if the port is used, it will find an available port!
 */

tryUsePort(3000,(port)=>{
    app.set('port', port);
    const server = http.createServer(app);
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);


    /**
     *  judge the current os type */

    function judgeOsType(){
        const osType=os.type();

        switch (osType){
            case 'linux':{
                return 'linux';
            }
            case 'Darwin':
                return 'mac';
            case 'Windows_NT':
                return 'windows';
            default:
                return ''
        }
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
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

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        consola.success(`Listening on ${bind} successfully!`)
    }
})


