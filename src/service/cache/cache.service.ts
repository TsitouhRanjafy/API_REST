import { CacheDataDAGet, CacheDataDASet, DACache, LivreDAGet } from "../../DA";

export class CacheService {
    constructor(
        private cacheDASet: CacheDataDASet,
        private cacheDAGet: CacheDataDAGet,
        private livreDAGet: LivreDAGet,
        private cacheDADelete: DACache
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

    public async reinitialiseCache(){
        try {
            await this.cacheDADelete.RestoreCache();
            await this.CacheNombreToutLivre("nombreToutLivre");
        } catch (error) {
            throw error
        }
    }
}