import {Router} from "express";
import {isLogged} from "../middlewares/auth";
import {addBeer, changeBeerName, getBeers, removeBeer} from "../models/beers.model";

export const beersRouter = Router();
beersRouter.get("/", async (req, res) => {
    try {
        const result = await getBeers();
        res.status(200).json({status: "success", payload: result});
    } catch {
        res.status(500).json({status: "error", message: "Could not retrieve beers"});
    }
});

beersRouter.post("/", async (req, res) => {
    const {cerveceria, origen, estilo, alcohol, premios, ibu} = req.body;
    try {
        await addBeer(cerveceria, origen, estilo, alcohol, premios, ibu);
        res.status(201).json({status: "success", message: "Beer added successfully"});
    } catch (e) {
        res.status(500).json({status: "error", message: "Could not add beer"});
    }
});

beersRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {cerveceria} = req.body;
    try {
        await changeBeerName(id, cerveceria);
        res.status(200).json({status: "success", message: "Beer updated successfully"});
    } catch (e) {
        res.status(500).json({status: "error", message: "Could not update beer"});
    }
});

beersRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await removeBeer(id);
        res.status(200).json({status: "success", message: "Beer deleted successfully"});
    } catch (e) {
        res.status(500).json({status: "error", message: "Could not delete beer"});
    }
});