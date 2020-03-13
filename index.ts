import Server from './classes/server';
import mongoose from 'mongoose';
import 'colorts/lib/string';
import express from 'express';
import userRoutes from './routes/usuario.routes';
import postRoutes from './routes/post.routes';


const server = new Server();

server.app.use(express.urlencoded({
    extended: true
}));
server.app.use(express.json());

// Rutas app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// Conectarr DB
mongoose.connect('mongodb://localhost:27017/fotosgram', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if ( err ) throw err;

    console.log('Base de datos ONLINE'.yellow);
});

// init express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port}`);
});