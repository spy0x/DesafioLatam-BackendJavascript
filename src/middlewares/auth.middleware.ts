import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUser } from '../models/auth.model';

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
  const jwtSecret = process.env.JWT_SECRET || 'secret';
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ status: 'error', message: 'NO TOKEN PROVIDED' });
    return;
  }
  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'INVALID TOKEN' });
  }
};

export const validUserData = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ status: 'error', message: 'MISSING DATA' });
    return;
  }
  next();
};

export const userAvailable = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  try {
    const user = await findUser(username);
    if (user) {
      res.status(409).json({ status: 'error', message: 'USER ALREADY EXISTS' });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'INTERNAL SERVER ERROR' });
  }
};
