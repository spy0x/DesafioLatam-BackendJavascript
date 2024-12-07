import {Pool} from 'pg';

const pool = () => new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string) || 5432,
    allowExitOnIdle: true
});
export const getBeers = async () => {
    const query = `SELECT *
                   FROM beers`;
    const result = await pool().query(query);
    return result.rows;
}

export const addBeer = async (cerveceria: string, origen: string, estilo: string, alcohol: number, premios: number, ibu: number) => {
    const query = `INSERT INTO beers (cerveceria, origen, estilo, alcohol, premios, ibu)
                   VALUES ($1, $2, $3, $4, $5, $6)`;
    await pool().query(query, [cerveceria, origen, estilo, alcohol, premios, ibu]);
}

export const changeBeerName = async (id: string, cerveceria: string) => {
    const query = `UPDATE beers
                   SET cerveceria = $1
                   WHERE id = $2`;
    await pool().query(query, [cerveceria, id]);
}

export const removeBeer = async (id: string) => {
    const query = `DELETE
                   FROM beers
                   WHERE id = $1`;
    await pool().query(query, [id]);
}
        

