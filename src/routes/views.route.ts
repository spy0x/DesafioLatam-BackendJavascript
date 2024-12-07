import {Router} from "express";

export const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    res.send("Bienvenido a la ChelaAPI: una base de datos de cervezas chilenas!");
});