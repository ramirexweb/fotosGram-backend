import Server from './classes/server';
import userRoutes from './routes/usuario.routes';
import mongoose from 'mongoose';
import 'colorts/lib/string';


const server = new Server();

// Rutas app
server.app.use('/user', userRoutes);

// Conectarr DB
mongoose.connect('mongodb://localhost:27017/fotosgram', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if ( err ) throw err;

    console.log('Base de datos ONLINE'.yellow);
});

// init express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port}`);
});