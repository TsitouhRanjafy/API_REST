import { CacheService } from "../cache/cache.service";

export class InitServiceGet {
    constructor(private cacheService: CacheService){}

    public async getNombreToutLivre(): Promise<number> {
        try {
            const nbToutLivre: number = await this.cacheService.getNombreToutLivre();
            return nbToutLivre;
        } catch(error) {
            throw error
        }
    }

}