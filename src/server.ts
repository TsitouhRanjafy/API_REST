import express,{ Application } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";


import { 
    EmpruntDAPost, 
    LivreDAGet, 
    syncDatabaseMysql, 
    UtilisateurBadgedDAGet , 
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
    UtilisateurDAGet,
    UtilisateurPutDataAccess,
    OTPDataAcces,
} from "./DA/index";
import { 
    LivreRouterGet , 
    UtilisateurBadgedRouterGet , 
    EmpruntRouterPost , 
    AvisRouterPost,
    LivreRouterDelete,
    EmpruntRouterGet,
    LivreRouterPut,
    LivreRouterPost,
    InitRouterGet,
    EmpruntRouterDelete,
    UtilisateurRouterPost,
    UtilisateurRouteGet,
    UtilisateurRoutePut,
    OTPRoutes
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
    UtilisateurPostService,
    UtilisateurGetService,
    UtilisateurPutService,
    OTPService
} from "./service/index";
import { limiterRequests } from "./utils";
import { config } from "./config/env";


const app : Application = express();
const router = express.Router();


app.use(cors({
    origin: config.DOMAIN_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [ 'Content-type','Authorization' ]
}));
app.use(limiterRequests)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use('/',router)

InitRouterGet(router,new InitServiceGet(new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache)));

LivreRouterGet(router,new LivreServiceGet(new LivreDAGet,new CacheDataDASet,new CacheDataDAGet,new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache)))
LivreRouterDelete(router,new LivreServiceDelete(new LivreDADelete,new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache),new LivreDAGet))
LivreRouterPut(router,new LivreServicePut(new LivreDAPut))
LivreRouterPost(router,new LivreServicePost(new LivreDAPost,new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache)));

UtilisateurBadgedRouterGet(router,new UtilisateurServiceGet(new UtilisateurBadgedDAGet))
UtilisateurRouterPost(router,new UtilisateurPostService(new UtilisateurDAPost,new UtilisateurServiceGet(new UtilisateurBadgedDAGet)))
UtilisateurRouteGet(router,new UtilisateurGetService(new UtilisateurDAGet));
UtilisateurRoutePut(router,new UtilisateurPutService(new UtilisateurPutDataAccess,new UtilisateurDAGet,new OTPDataAcces))

EmpruntRouterPost(router,new EmpruntServicePost(new EmpruntDAPost,new UtilisateurBadgedDAGet,new LivreDAGet,new LivreDAPut))
EmpruntRouterGet(router,new EmpruntServiceGet(new EmpruntDAGet));
EmpruntRouterDelete(router,new EmpruntServiceDelete(new EmpruntDADelete,new LivreServicePut(new LivreDAPut),new EmpruntDAGet,new EmpruntDAPost));

AvisRouterPost(router,new AvisServicePost(new AvisDAPost))

OTPRoutes(router,new OTPService(new OTPDataAcces),new UtilisateurPutService(new UtilisateurPutDataAccess,new UtilisateurDAGet,new OTPDataAcces))


app.listen(config.PORT, async () =>{
    const cacheService = new CacheService(new CacheDataDASet,new CacheDataDAGet,new LivreDAGet,new DACache);
    try{
        console.log(`   \n server running on port ${config.PORT} \n`);
        syncDatabaseMysql();
        connectMongo();    
        await cacheService.CacheNombreToutLivre("nombreToutLivre");
    } catch(error){
        throw error
    } 
})









