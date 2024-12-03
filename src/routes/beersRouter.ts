import {Router} from "express";
import {Pool} from "pg";
import {isLogged} from "../middlewares/auth";

export const beersRouter = Router();

const pool = () => new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string) || 5432,
    allowExitOnIdle: true
});

beersRouter.get("/", async (req, res) => {
    const query = `SELECT *
                   FROM beers`;
    try {
        const result = await pool().query(query);
        res.send(result.rows);
    } catch {
        res.send("Error al obtener las cervezas");
    }
});

beersRouter.post("/", async (req, res) => {
    const {cerveceria, origen, estilo, alcohol, premios, ibu} = req.body;
    const query = `INSERT INTO beers (cerveceria, origen, estilo, alcohol, premios, ibu)
                   VALUES ($1, $2, $3, $4, $5, $6)`;
    try {
        await pool().query(query, [cerveceria, origen, estilo, alcohol, premios, ibu]);
        res.send("Cerveza ingresada correctamente");
    } catch (e) {
        res.send("Error al ingresar la cerveza");
    }
});

beersRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {cerveceria} = req.body;
    const query = `UPDATE beers
                   SET cerveceria = $1
                   WHERE id = $2`;
    try {
        await pool().query(query, [cerveceria, id]);
        res.send("Cerveza actualizada correctamente");
    } catch (e) {
        res.send("Error al actualizar la cerveza");
    }
});

beersRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const query = `DELETE
                   FROM beers
                   WHERE id = $1`;
    try {
        await pool().query(query, [id]);
        res.send("Cerveza eliminada correctamente");
    } catch (e) {
        res.send("Error al eliminar la cerveza");
    }
});