import {Router} from "express";
import pg from "pg";
import {isLogged} from "../middlewares/auth";
const {Pool} = pg;
export const beersRouter = Router();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string) || 5432
});

beersRouter.get("/", async (req, res) => {
    const query = `SELECT * FROM beers`;
    try {
        const result = await pool.query(query);
        res.send(result.rows);
    } catch {
        res.send("Error al obtener las cervezas");
    }
});

beersRouter.post("/", async (req, res) => {
    const {cerveceria, origen, estilo, alcohol, premios, ibu} = req.body;
    const query = `INSERT INTO beers (cerveceria, origen, estilo, alcohol, premios, ibu) VALUES ($1, $2, $3, $4, $5, $6)`;
    await pool.query(query, [cerveceria, origen, estilo, alcohol, premios, ibu]);
    res.send("Cerveza ingresada correctamente");
});