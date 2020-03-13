import { Router, Response } from "express";
import { verificarToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';

const postRoutes = Router();

// obtener post
postRoutes.get('/', async ( req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = (pagina -1) * 10;

    const post = await Post
        .find()
        .populate('usuario', '-password')
        .sort({
            _id: -1
        })
        .limit(10)
        .skip(skip)
        .exec();
    res.json({
        ok: true,
        pagina,
        post
    });
});

// crear post
postRoutes.post('/', [ verificarToken], ( req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;


    Post.create( body )
        .then( async postDB => {

            await postDB.populate('usuario', '-password').execPopulate();

            res.json({
                ok: true,
                post: postDB
            });
        })
        .catch( err => {
            res.json(err)
        });
});


export default postRoutes;