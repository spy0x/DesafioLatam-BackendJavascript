import { Router } from "express";
import { beerCreate, beerDeleteOne, beerGet, beersGetAll, beerUpdate as beerUpdateName } from "../controllers/beers.controller";

export const beersRouter = Router();

beersRouter.get("/", beersGetAll);

beersRouter.get("/:id", beerGet);

beersRouter.post("/", beerCreate);

beersRouter.put("/:id", beerUpdateName);

beersRouter.delete("/:id", beerDeleteOne);