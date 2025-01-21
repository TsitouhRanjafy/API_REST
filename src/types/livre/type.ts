export interface ILivre {
    titre: string,
    auteur: string,
    sortie: Date,
    genre: string,
    image_name: string
}

export enum triMethodeLivre {
    ASC_BY_DATESORTIE=1,
    ASC_BY_ALPHABETIQUE=2,
    DESC_BY_DATESORTIE=3,
    DESC_BY_ALPHABETIQUE=4
}