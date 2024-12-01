import {Router} from "express";
import {isLogged} from "../middlewares/auth";

export const beersRouter = Router();

beersRouter.get("/", isLogged, (req, res) => {
    res.send("Estas son todas las cervezas chilenas");
});