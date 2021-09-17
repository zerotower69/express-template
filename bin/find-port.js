/**
 * @description Find a available port to provide express app!
 */
const net =require('net');

function findPortUsed(port){
    return new Promise((resolve, reject) =>{
        const server =net.createServer().listen(port);

        server.on("listening",()=>{
            server.close();
            resolve(port)
        })

        server.on('error',(err)=>{
            if(err.code == 'EADDRINUSE'){
                resolve(err);
            }
        })
    })
}


async function tryUsePort(port, portAvailableCallback) {
    let res = await findPortUsed(port);
    if (res instanceof Error) {
        port++;
        await tryUsePort(port, portAvailableCallback);
    } else {
        if(typeof  portAvailableCallback === 'function'){
            portAvailableCallback(port);
        }
        return Promise.resolve(port);
    }
}




module.exports={
    tryUsePort,
}


