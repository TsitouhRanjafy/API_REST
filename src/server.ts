import express,{ Application , Request, Response, NextFunction} from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import { 
    EmpruntDAPost, 
    LivreDAGet, 
    syncDatabaseMysql, 
    UtilisateurDAGet , 
    connectMongo, 
    AvisDAPost,
    LivreDADelete,
    EmpruntDAGet,
    LivreDAPut,
    LivreDAPost,
    CacheDataDASet,
    CacheDataDAGet,
    DACache,
    EmpruntDADelete,
    UtilisateurDAPost,
} from "./DA/index";
import { 
    LivreRouterGet , 
    UtilisateurRouterGet , 
    EmpruntRouterPost , 
    AvisRouterPost,
    LivreRouterDelete,
    EmpruntRouterGet,
    LivreRouterPut,
    LivreRouterPost,
    InitRouterGet,
    EmpruntRouterDelete,
    UtilisateurRouterPost,
} from "./routes/index";
import { 
    AvisServicePost, 
    EmpruntServicePost, 
    LivreServiceGet, 
    UtilisateurServiceGet,
    LivreServiceDelete,
    EmpruntServiceGet,
    LivreServicePut,
    LivreServicePost,
    CacheService,
    InitServiceGet,
    EmpruntServiceDelete,
    UtilisateurPostService
} from "./service/index";
import { throwDeprecation } from "process";

dotenv.config()

const app : Application = express();
const router = express.Router();
const port = process.env.PORT || 3000


app.use(cors({
    origin: process.env.DOMAIN_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Access-Control-Allow-Origin', process.env.DOMAIN_ORIGIN || 'http://localhost:4200']
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/',router)

InitRouterGet(router,new InitServiceGet(new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache)));

LivreRouterGet(router,new LivreServiceGet(new LivreDAGet,new CacheDataDASet,new CacheDataDAGet,new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache)))
LivreRouterDelete(router,new LivreServiceDelete(new LivreDADelete,new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache),new LivreDAGet))
LivreRouterPut(router,new LivreServicePut(new LivreDAPut))
LivreRouterPost(router,new LivreServicePost(new LivreDAPost,new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache)));

UtilisateurRouterGet(router,new UtilisateurServiceGet(new UtilisateurDAGet))
UtilisateurRouterPost(router,new UtilisateurPostService(new UtilisateurDAPost))

EmpruntRouterPost(router,new EmpruntServicePost(new EmpruntDAPost,new UtilisateurDAGet,new LivreDAGet,new LivreDAPut))
EmpruntRouterGet(router,new EmpruntServiceGet(new EmpruntDAGet));
EmpruntRouterDelete(router,new EmpruntServiceDelete(new EmpruntDADelete,new LivreServicePut(new LivreDAPut),new EmpruntDAGet,new EmpruntDAPost));

AvisRouterPost(router,new AvisServicePost(new AvisDAPost))


app.listen(port, async () =>{
    const cacheService = new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache);
    try{
        console.log(`   \n server running on port ${port} \n`);
        syncDatabaseMysql();
        connectMongo();    
        await cacheService.CacheNombreToutLivre("nombreToutLivre");
    } catch(error){
        throw error
    } 
})


