import { addBeer, changeBeerName, getAllBeers, getBeer, removeBeer } from "../models/beers.model";
import { Request, Response } from "express";


export const beersGetAll = async (req: Request, res: Response) => {
    try {
        const result = await getAllBeers();
        res.status(200).json({status: "success", payload: result});
    } catch {
        res.status(500).json({status: "error", message: "Could not retrieve beers"});
    }
};

export const beerGet = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await getBeer(id);
        res.status(200).json({status: "success", payload: result});
    } catch {
        res.status(500).json({status: "error", message: "Could not retrieve beer"});
    }
}

export const beerCreate = async (req: Request, res: Response) => {
    const {cerveceria, nombre, origen, estilo, alcohol, premios, ibu} = req.body;
    try {
        await addBeer(cerveceria, nombre, origen, estilo, alcohol, premios, ibu);
        res.status(201).json({status: "success", message: "Beer added successfully"});
    } catch (e) {
        res.status(500).json({status: "error", message: "Could not add beer"});
    }
}

export const beerUpdate = async (req: Request, res: Response) => {
    const id = req.params.id;
    const {cerveceria} = req.body;
    try {
        await changeBeerName(id, cerveceria);
        res.status(200).json({status: "success", message: "Beer updated successfully"});
    } catch (e) {
        res.status(500).json({status: "error", message: "Could not update beer"});
    }
}

export const beerDeleteOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
      await removeBeer(id);
      res.status(200).json({status: "success", message: "Beer deleted successfully"});
  } catch (e) {
      res.status(500).json({status: "error", message: "Could not delete beer"});
  }
}