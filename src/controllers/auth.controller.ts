import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt.utils';
import { createUser, findUser } from '../models/auth.model';
import { comparePassword, hashPassword } from '../utils/brcrypt.utils';
import { UserModel } from '../../types';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    await createUser(username, hashedPassword);
    res.status(201).send({ status: 'success', message: 'User created' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = (await findUser(username)) as UserModel;
    if (!user) {
      res.status(401).send({ status: 'error', message: 'Invalid credentials' });
      return;
    }
    const match = await comparePassword(password, user.password);
    if (match) {
      const token = generateToken(user.username);
      res.status(200).send({ status: 'success', message: 'User logged in', token });
      return;
    } else {
      res.status(401).send({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).send({ status: 'error', message: 'Internal Server Error' });
  }
};
