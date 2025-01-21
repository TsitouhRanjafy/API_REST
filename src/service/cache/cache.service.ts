import { CacheDataDAGet, CacheDataDASet, CacheDataDADelete, LivreDAGet } from "../../DA";

export class CacheService {
    constructor(
        private cacheDASet: CacheDataDASet,
        private cacheDAGet: CacheDataDAGet,
        private livreDAGet: LivreDAGet,
        private cacheDADelete: CacheDataDADelete
    ){}

    public async CacheNombreToutLivre(cle: string){
        try {
            const nombreToutLivre = await this.livreDAGet.getNombreToutLivre();
            const result = this.cacheDASet.CacheSimpleData(cle,JSON.stringify(nombreToutLivre));
            return result;
        } catch (error) {
            throw error
        }
    }

    public async getNombreToutLivre(): Promise<number> {
        try {
            const nombreToutLivre = await this.cacheDAGet.getCacheSimpleData("nombreToutLivre");
            if (!nombreToutLivre) return 0;
            return parseInt(JSON.parse(nombreToutLivre)[0].nombreToutLivre);
        } catch (error) {
            throw error
        }
    }

    public async RestoreCache(): Promise<void>{
        try {
            await this.cacheDADelete.RestoreCache();
            await this.CacheNombreToutLivre("nombreToutLivre");
        } catch (error) {
            throw error
        }
    }
}