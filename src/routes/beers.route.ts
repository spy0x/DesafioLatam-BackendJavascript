import { Router } from 'express';
import { beerCreate, beerDeleteOne, beerGet, beersGetAll, beerUpdate as beerUpdateName } from '../controllers/beers.controller';
import { isLogged } from '../middlewares/auth.middleware';

export const beersRouter = Router();

beersRouter.get('/', beersGetAll);

beersRouter.get('/:id', beerGet);

beersRouter.post('/', isLogged, beerCreate);

beersRouter.put('/:id', isLogged, beerUpdateName);

beersRouter.delete('/:id', isLogged, beerDeleteOne);
