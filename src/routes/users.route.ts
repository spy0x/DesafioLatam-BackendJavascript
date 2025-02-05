import { Router } from "express";
import { login, register } from "../controllers/users.controller";
import { userAvailable, validUserData } from "../middlewares/auth.middleware";


export const usersRouter = Router();

usersRouter.post("/login", validUserData, login);
usersRouter.post("/register", validUserData, userAvailable, register);


