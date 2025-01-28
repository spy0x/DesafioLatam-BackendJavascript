import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { userAvailable, validUserData } from "../middlewares/auth";


export const authRouter = Router();

authRouter.post("/login", validUserData, login);
authRouter.post("/register", validUserData, userAvailable, register);


