import Server from './classes/server';


const server = new Server();


// init express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port}`);
});