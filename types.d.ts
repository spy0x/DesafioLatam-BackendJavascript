import {Model} from 'sequelize';

export type Beer = {
    id: string;
    nombre: string;
    cerveceria: string;
    origen: string;
    estilo: string;
    alcohol: number;
    premios: string;
    ibu: number;
}

export class BeerModel extends Model<Beer> {
    id: string;
    nombre: string;
    cerveceria: string;
    origen: string;
    estilo: string;
    alcohol: number;
    premios: string;
    ibu: number;
}

export class UserModel extends Model {
    id: string;
    username: string;
    password: string;
}