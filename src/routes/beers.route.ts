import { Router } from 'express';
import { beerCreate, beerDeleteOne, beerGet, beersGetAll, beerUpdate as beerUpdateName } from '../controllers/beers.controller';
import { isAdmin, isLogged } from '../middlewares/auth.middleware';

export const beersRouter = Router();

beersRouter.get('/', isLogged, beersGetAll);

beersRouter.get('/:id', isLogged, beerGet);

beersRouter.post('/', isLogged, isAdmin, beerCreate);

beersRouter.put('/:id', isLogged, isAdmin, beerUpdateName);

beersRouter.delete('/:id', isLogged, isAdmin, beerDeleteOne);
