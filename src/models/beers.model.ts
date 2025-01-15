// import {Pool} from 'pg';
import { BeerModel } from '../../types';
import { Beer } from '../database/beers.schema';

// const pool = () => new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: parseInt(process.env.DB_PORT as string) || 5432,
//     allowExitOnIdle: true
// });

export const getAllBeers = async () => {
  return await Beer.findAll();
  // const query = `SELECT *
  //                FROM beers`;
  // const result = await pool().query(query);
  // return result.rows;
};

export const getBeer = async (id: string) => {
  return await Beer.findByPk(id);
  // const query = `SELECT *
  //                FROM beers
  //                WHERE id = $1`;
  // const result = await pool().query(query, [id]);
  // return result.rows[0];
};

export const addBeer = async (cerveceria: string, origen: string, estilo: string, alcohol: number, premios: string, ibu: number) => {
  return await Beer.create({ cerveceria, origen, estilo, alcohol, premios, ibu });
  // const query = `INSERT INTO beers (cerveceria, origen, estilo, alcohol, premios, ibu)
  //                VALUES ($1, $2, $3, $4, $5, $6)`;
  // await pool().query(query, [cerveceria, origen, estilo, alcohol, premios, ibu]);
};

export const changeBeerName = async (id: string, cerveceria: string) => {
  const beer = (await Beer.findByPk(id)) as BeerModel;
  if (beer) {
    beer.cerveceria = cerveceria;
    await beer.save();
  } else throw new Error('Beer not found');
  // const query = `UPDATE beers
  //                SET cerveceria = $1
  //                WHERE id = $2`;
  // await pool().query(query, [cerveceria, id]);
};

export const removeBeer = async (id: string) => {
  const beer = (await Beer.findByPk(id)) as BeerModel;
  if (beer) await beer.destroy();
  else throw new Error('Beer not found');
  // const query = `DELETE
  //                FROM beers
  //                WHERE id = $1`;
  // await pool().query(query, [id]);
};
