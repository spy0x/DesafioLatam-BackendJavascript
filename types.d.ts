import {Model} from 'sequelize';

export type Beer = {
    id: string;
    cerveceria: string;
    origen: string;
    estilo: string;
    alcohol: number;
    premios: string;
    ibu: number;
}

export class BeerModel extends Model<Beer> {
    id: string;
    cerveceria: string;
    origen: string;
    estilo: string;
    alcohol: number;
    premios: string;
    ibu: number;
}