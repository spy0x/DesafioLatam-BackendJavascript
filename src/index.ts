import express from 'express';
import dotenv from 'dotenv';
import { viewsRouter } from './routes/views.route';
import { beersRouter } from './routes/beers.route';
import { usersRouter } from './routes/users.route';
import { sequelize } from './database/db';
import './database/beers.schema';

dotenv.config();

export const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTER
app.use('/api/beers', beersRouter);
app.use('/auth', usersRouter);
app.use('/', viewsRouter);

// RUN SERVER
const port = process.env.PORT || 3000;
const startServer = async () => {
  try {
    // await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Conexión a la base de datos realizada correctamente');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log('Error al conectar a la base de datos', err);
  }
};
startServer();
