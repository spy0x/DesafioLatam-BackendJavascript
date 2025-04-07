import { Router } from 'express';
import { beerCreate, beerDeleteOne, beerGet, beersGetAll, beerUpdate as beerUpdateName } from '../controllers/beers.controller';
import { isAdmin, isLogged } from '../middlewares/auth.middleware';

export const beersRouter = Router();

/**
 * Middleware de nivel de router
 * Se ejecuta solo para las rutas definidas en este router
 */
beersRouter.use((_, __, next) => {
  console.log('Middleware de nivel de direccionador ejecutado.');
  next();
});

beersRouter.get('/', isLogged, beersGetAll);

beersRouter.get('/:id', isLogged, beerGet);

beersRouter.post('/', isLogged, isAdmin, beerCreate);

beersRouter.put('/:id', isLogged, isAdmin, beerUpdateName);

beersRouter.delete('/:id', isLogged, isAdmin, beerDeleteOne);
