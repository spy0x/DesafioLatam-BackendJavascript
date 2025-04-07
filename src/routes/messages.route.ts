import { Router } from 'express';

export const messagesRouter = Router();

/**
* Ruteo basado en contenido
* Maneja diferentes tipos de respuesta según el parámetro type
*
* @route GET /api/route
* @param {string} type - Tipo de respuesta solicitada (text/json)
*/
messagesRouter.get('/route', (req, res) => {
  const { type } = req.query;
  if (type === 'text') {
  res.send('Mensaje de texto enviado.');
  } else if (type === 'json') {
  res.json({ message: 'Mensaje en formato JSON enviado.' });
  } else {
  res.status(400).send('Tipo de mensaje no soportado.');
  }
  });