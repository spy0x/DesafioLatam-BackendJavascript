import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { Message } from '../types';
import './database/beers.schema';
import { sequelize } from './database/db';
import { beersRouter } from './routes/beers.route';
import { messagesRouter } from './routes/messages.route';
import { usersRouter } from './routes/users.route';
import { viewsRouter } from './routes/views.route';
import { startWebSocket } from './utils/socket.utils';

/**
 * Estructuras de datos para el sistema de mensajería
 */
const messages: Message[] = []; // Almacena los mensajes pendientes

dotenv.config();

export const app = express();

//
// MIDDLEWARES
//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));

/* Middleware de nivel de aplicación
 * Se ejecuta en cada solicitud que llega al servidor
 *
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para pasar al siguiente middleware
 */
app.use((req, res, next) => {
  console.log('Middleware de nivel de aplicación ejecutado.');
  next();
});

/**
 * Middleware global de manejo de errores
 * Captura y procesa errores no manejados
 *
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para pasar al siguiente middleware
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).send('Algo salió mail!');
});


// ROUTER

app.use('/api/beers', beersRouter);
app.use('/auth', usersRouter);
app.use('/api', messagesRouter);
app.use('/', viewsRouter);

//
//ROUTES
//

/**
 * Endpoint para enviar mensajes
 *
 * @route POST /send
 * @param {Object} req.body.message - Mensaje a enviar
 * @returns {Object} Estado del envío
 */
app.post('/send', (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) {
    res.status(400).json({ error: 'El mensaje es requerido' });
  } else {
    messages.push({ header: 'Mensaje', body: message });
    console.log('Mensaje recibido:', message);
    res.status(200).json({ status: 'Mensaje enviado exitosamente' });
  }
});

/**
 * Endpoint para recibir mensajes
 * Implementa patrón FIFO
 *
 * @route GET /receive
 * @returns {Object} Mensaje o respuesta vacía
 */
app.get('/receive', (req: Request, res: Response) => {
  if (messages.length > 0) {
    const message = messages.shift();
    res.status(200).json({ message });
  } else {
    res.status(204).send();
  }
});

// RUN SERVER
const port = process.env.PORT || 3000;
const startServer = async () => {
  try {
    // await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Conexión a la base de datos realizada correctamente');
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    startWebSocket(server);
  } catch (err) {
    console.log('Error al conectar a la base de datos', err);
  }
};
startServer();
